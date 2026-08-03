import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { Sponsorship } from "@/models/Sponsorship";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;
    if (!session || !["employee", "admin"].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userid, type, employer, status, validUntil } = await req.json();

    await connectToDatabase();

    const sponsorshipData: any = {
      type: type || "",
      employer: employer || "",
      status: status || "Pending",
      validUntil: validUntil ? new Date(validUntil) : undefined,
    };

    if (userid) {
      sponsorshipData.userid = userid;
    }

    const sponsorship = await Sponsorship.create(sponsorshipData);

    return NextResponse.json({ message: "Sponsorship created successfully", sponsorship }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userIdQuery = searchParams.get("userid");
    const role = (session.user as any).role;

    if (role === "employee" || role === "admin") {
      const query = userIdQuery ? { userid: userIdQuery } : {};
      const sponsorships = await Sponsorship.find(query).populate("userid", "username");
      return NextResponse.json({ sponsorships }, { status: 200 });
    }

    const sponsorships = await Sponsorship.find({ userid: (session.user as any).id });
    return NextResponse.json({ sponsorships }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sponsorshipId, type, employer, status, validUntil, userid } = await req.json();

    if (!sponsorshipId) {
      return NextResponse.json({ error: "Sponsorship ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const sponsorship = await Sponsorship.findById(sponsorshipId);
    if (!sponsorship) {
      return NextResponse.json({ error: "Sponsorship not found" }, { status: 404 });
    }

    const role = (session.user as any).role;
    const isEmployeeOrAdmin = role === "employee" || role === "admin";
    const isOwner = sponsorship.userid && sponsorship.userid.toString() === (session.user as any).id;

    if (!isEmployeeOrAdmin && !isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isEmployeeOrAdmin || isOwner) {
      if (type !== undefined) sponsorship.type = type;
      if (employer !== undefined) sponsorship.employer = employer;
      if (status !== undefined) sponsorship.status = status;
      if (validUntil !== undefined) sponsorship.validUntil = validUntil ? new Date(validUntil) : undefined;
    }

    if (isEmployeeOrAdmin) {
      if (userid !== undefined) sponsorship.userid = userid || undefined;
      if (userid === null) sponsorship.userid = undefined; 
    }

    await sponsorship.save();

    return NextResponse.json({ message: "Sponsorship updated successfully", sponsorship }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;
    if (!session || !["employee", "admin"].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sponsorshipId = searchParams.get("id");

    if (!sponsorshipId) {
      return NextResponse.json({ error: "Sponsorship ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    await Sponsorship.findByIdAndDelete(sponsorshipId);

    return NextResponse.json({ message: "Sponsorship deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
