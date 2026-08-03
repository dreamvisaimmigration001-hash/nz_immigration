import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { Visa } from "@/models/Visa";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;
    if (!session || !["employee", "admin"].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userid, fullName, passportNumber, nationality, dateOfBirth, visaType, status, submittedAt } = await req.json();

    await connectToDatabase();

    const visaData: any = {
      fullName: fullName || "",
      passportNumber: passportNumber || "",
      nationality: nationality || "",
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      visaType: visaType || "",
      status: status || "Draft",
      submittedAt: submittedAt ? new Date(submittedAt) : undefined,
    };

    if (userid) {
      visaData.userid = userid;
    }

    const visa = await Visa.create(visaData);

    return NextResponse.json({ message: "Visa created successfully", visa }, { status: 201 });
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
      const visas = await Visa.find(query).populate("userid", "username");
      return NextResponse.json({ visas }, { status: 200 });
    }

    const visas = await Visa.find({ userid: (session.user as any).id });
    return NextResponse.json({ visas }, { status: 200 });
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

    const { visaId, fullName, passportNumber, nationality, dateOfBirth, visaType, status, userid, submittedAt } = await req.json();

    if (!visaId) {
      return NextResponse.json({ error: "Visa ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const visa = await Visa.findById(visaId);
    if (!visa) {
      return NextResponse.json({ error: "Visa not found" }, { status: 404 });
    }

    const role = (session.user as any).role;
    const isEmployeeOrAdmin = role === "employee" || role === "admin";
    const isOwner = visa.userid && visa.userid.toString() === (session.user as any).id;

    if (!isEmployeeOrAdmin && !isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isEmployeeOrAdmin || isOwner) {
      if (fullName !== undefined) visa.fullName = fullName;
      if (passportNumber !== undefined) visa.passportNumber = passportNumber;
      if (nationality !== undefined) visa.nationality = nationality;
      if (dateOfBirth !== undefined) visa.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined;
      if (visaType !== undefined) visa.visaType = visaType;
      if (status !== undefined) visa.status = status;
      if (submittedAt !== undefined) visa.submittedAt = submittedAt ? new Date(submittedAt) : undefined;
    }

    if (isEmployeeOrAdmin) {
      if (userid !== undefined) visa.userid = userid || undefined;
      if (userid === null) visa.userid = undefined; 
    }

    await visa.save();

    return NextResponse.json({ message: "Visa updated successfully", visa }, { status: 200 });
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
    const visaId = searchParams.get("id");

    if (!visaId) {
      return NextResponse.json({ error: "Visa ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    await Visa.findByIdAndDelete(visaId);

    return NextResponse.json({ message: "Visa deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
