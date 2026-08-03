"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoginModal from "./LoginModal";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const t = setTimeout(() => setActiveMenu(null), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  const toggleMenu = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  return (
    <>
      <header
        className="header"
        style={status === "authenticated" ? { backgroundColor: "#f4f7f6" } : {}}
      >
        <div className="header__container">
          <div className="header__top">
            <Link
              href="/"
              className="header__logo"
              aria-label="Immigration New Zealand"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="157"
                height="50"
                fill="none"
                viewBox="0 0 157 50"
                className="header__logo-mobile"
              >
                <g fill="#1E222C" clipPath="url(#a)">
                  <path d="M8.631 37.185c.1-.123 2.18 8.405 13.756 6.95-2.27-5.555-9.343-9.193-10.98-9.295.31-.245 2.349-1.789 2.68-1.978-.441 1.503 6.201 7.777 11.336 6.04-1.368-4.251-7.008-7.843-8.466-7.9.611-.316 1.222-.812 1.858-1.118-.335.807 4.549 5.666 9.769 5.278.05-2.52-5.6-7.332-6.693-6.95.521-.28 1.318-.756 1.558-.878.741 1.737 5.56 5.447 8.877 4.839-2.716-5.84-6.172-6.188-6.202-6.193.917-.445 1.463-.726 1.628-.802.01 1.568 4.754 5.104 8.065 4.276-.671-2.6-3.281-5.135-5.84-5.375l1.747-.843c-.27.49 3.743 3.893 7.54 3.679-1.834-4.527-4.349-4.624-5.25-4.798.51-.235 1.067-.547 1.603-.833.215.578 2.284 3.567 7.289 2.81-1.263-2.759-3.903-3.678-5.29-3.776.71-.429 1.242-.608 1.758-.904.355.419 1.603 3.112 6.682 2.13-1.077-2.615-3.406-3.239-4.318-3.418.431-.265.937-.546 1.278-.75.34.597 2.925 2.482 5.715 1.696-.536-1.58-2.514-2.524-4.288-2.586a31.8 31.8 0 0 0 1.483-1.037c.256.613 1.773 2.085 5.3 1.098-1.132-2.253-4.027-1.977-4.057-1.962.696-.526.896-.71 1.442-1.139.055.026 1.688 2.345 4.544.73-.862-1.333-2.13-2.043-3.442-1.69.386-.389.717-.67 1.037-1.038-.125.337 2.124 1.543 4.103-.02-.947-.935-1.984-1.17-3.11-1.099.224-.332.29-.306.59-.71 0 0 1.769 1.344 3.442-.327-1.363-1.032-2.94-.373-2.946-.373l.646-1.012c.286.383 2.194.751 2.86-.547-.55-.541-2.264-.357-2.444-.23.055-.05.21-.424.31-.623 3.532.44 2.325-3.745 1.529-6.1C42.42 21.017 24.716 6.435 3.066 19.392c-1.012 2.678-1.378 5.473-1.112 8.385.03.287.025.511.14 1.16-.04.2.24 1.794.816 3.567.426 1.262.907 2.11 1.438 3.413.316-.24.676-.516.922-.736-.967-1.4-4.223-9.887-.18-14.838 3.837-.067 4.273 11.103 3.631 12.288.025 0 1.784-1.205 2.465-1.635-.822-.332-3.727-10.04 1.122-14.071 0 0 4.323 1.686 2.525 11.925.736-.49 1.768-.935 2.785-1.466-.551-.976-3.506-8.308 1.222-12.135 2.545 1.063 2.415 9.074 1.418 10.822.817-.389 1.693-.854 2.51-1.232-1.493-.7-1.378-8.236 1.137-10.29 2.8 2.682 2.119 7.189 1.418 9.161 0 0 2.119-.894 2.104-.889-1.669-3.204-.892-7.082.891-8.61 1.368.895 1.743 3.475 1.117 7.752.596-.246.937-.424 1.523-.644-.366-.705-1.327-5.069 1.137-7.42 2.204 1.069 1.423 5.923 1.258 6.418.02-.035 1.292-.51 1.272-.552-.43-.945-.736-4.537 1.297-6.269.807.588 1.659 2.223.892 5.32.471-.236.982-.44 1.463-.665-.687-.782-.19-3.935.846-5.197 1.243.557 1.774 3.286 1.328 4.19.31-.158.711-.357 1.217-.649-.396-.638-.526-3.576.691-4.378 1.193.832 1.072 2.983 1.027 3.464.341-.225 1.338-.746 1.318-.762-.656-.597-.972-2.57.44-3.76 1.228.276 1.253 2.616 1.148 2.77.48-.318 1.242-.88 1.628-1.17-1.127-.251-.997-2.096-.386-2.913.747.158 1.273.618 1.518 1.977.29-.27.977-.838 1.187-1.088-.681-.056-1.533-1.564-.48-2.555.315.133 1.287.552 1.382 1.62.14-.103.651-.762.736-.88-.466-.173-.992-1.619-.506-2.253.647-.06 1.218.828 1.308 1.201l.631-.935c-.36-.301-1.112-1.17-.45-1.931.726.036.986.598 1.141 1.124-7.333 14.639-36.939 17.148-52.388 34.75 0 0-1.608 1.712-1.608 2.53v5.942h.31c.782-2.233 3.282-7.915 8.311-12.064M64.922-.002c-1.738.04-3.121 1.522-3.081 3.29.04 1.768 1.493 3.178 3.236 3.132 1.743-.04 3.126-1.517 3.08-3.29-.044-1.773-1.497-3.178-3.24-3.132h.005Zm2.865 3.142c.035 1.558-1.182 2.866-2.715 2.902-1.538.036-2.815-1.206-2.855-2.759-.04-1.564 1.177-2.866 2.715-2.902 1.533-.036 2.815 1.2 2.855 2.759Z"></path>
                  <path d="M64.601 2.557v-.383h-1.658v.383h.616V4.53h.411V2.557h.631Zm2.305 1.973V2.174h-.426l-.681 1.339-.677-1.339h-.416V4.53h.416V2.992l.491.986h.38l.487-.986V4.53h.425Zm84.698 27.065h-3.982v-11.23h3.982c1.223 0 2.225.372 2.921 1.078 1.132 1.16 1.127 2.575 1.117 4.072v.838c0 1.548.02 3.004-1.117 4.164-.696.705-1.703 1.078-2.921 1.078Zm-1.758-2.033h1.563c.691 0 1.187-.21 1.558-.67.391-.485.451-1.267.451-2.958 0-1.692-.065-2.381-.451-2.862-.376-.46-.867-.669-1.558-.669h-1.563v7.159Zm-43.847 2.033h-7.284V24.08c0-.751-.01-2.248.34-2.815.382-.598.867-.9 1.819-.9h5.13v2.034h-3.963c-.275 0-.576.061-.801.286-.22.225-.296.675-.296.97v1.253h4.308v2.038h-4.308v2.606h5.06v2.034l-.005.01Zm-34.7-11.23h-7.284v7.52c0 .752-.015 2.249.336 2.811.38.603.866.9 1.818.9h5.135v-2.034H67.34c-.28 0-.58-.062-.801-.281-.22-.23-.29-.68-.29-.976v-1.252h4.307v-2.034H66.25v-2.61h5.06v-2.034l-.01-.01Zm53.956 9.197v2.033h-7.178v-9.78c.01-.71-.206-1.037-.717-1.348l-.025-.01s-.015-.026-.015-.041c0-.031.02-.052.045-.052h1.308c.871 0 1.578.276 1.628 2.422v6.776h4.954Zm-63.514 2.033h-1.974l-4.248-6.714v6.714h-2.224v-11.23h1.969l4.248 6.703v-6.704h2.229v11.231Zm81.362-6.198v-3.796c-.04-.583-.18-.894-.636-1.13l-.025-.01s-.015-.025-.015-.04c0-.031.02-.052.045-.052h1.283c1.032-.04 1.553.747 1.573 2.35V31.6h-1.974l-4.248-6.714V31.6h-2.224V20.37h1.974l4.242 6.703v-1.67l.005-.006Zm-10.98-3.934c-.246-.736-.686-1.104-1.318-1.099h-.816l-4.003 11.231h2.33l.656-1.967h3.807l.646 1.967h2.33l-3.627-10.132h-.005Zm-2.525 6.234 1.313-3.853 1.267 3.853h-2.58Zm-16.295-6.234c-.246-.736-.687-1.104-1.318-1.099h-.816l-4.008 11.231h2.324l.662-1.967h3.807l.646 1.967h2.324l-3.621-10.132Zm-2.525 6.234 1.317-3.853 1.268 3.853h-2.585Zm-34.004-.45 1.954-6.883h1.668l1.954 6.883 1.668-6.883h2.324l-2.956 11.231h-1.848l-1.974-6.632-1.973 6.632h-1.854l-2.525-9.631c-.24-.94-.516-1.247-1.137-1.497l-.025-.01s-.02-.026-.02-.041c0-.031.02-.057.045-.057h1.473c1.057.01 1.683.526 1.919 1.554l1.297 5.329.01.005Zm19.527-3.934c.415-.736.701-1.636.726-2.335v-.614h-7.073v2.034h4.418l-4.619 7.383v1.814h7.274v-2.033h-4.639l3.908-6.25h.005ZM101.055 36.112c-.201-.598-.556-.894-1.072-.894h-.667l-3.256 9.136h1.894l.536-1.605h3.101l.521 1.605h1.893l-2.95-8.242Zm-2.054 5.074 1.067-3.132 1.032 3.132H99Zm-15.264 3.122c-.942 0-1.743-.332-2.39-.991-.871-.89-.871-1.973-.871-3.47v-.245c0-1.497 0-2.575.872-3.47.65-.664 1.432-.99 2.39-.99 1.166 0 1.873.3 2.71 1.154l.03.026-1.213 1.236-.025-.03c-.501-.511-.852-.752-1.498-.752-.43 0-.811.164-1.067.46-.316.358-.41.726-.41 2.483 0 1.758.1 2.141.41 2.494.25.291.626.45 1.067.45.471 0 .842-.159 1.142-.49.306-.343.371-.834.371-1.191v-.276h-1.548v-1.533h3.336v1.318c0 1.36-.23 2.136-.821 2.764-.651.69-1.483 1.043-2.475 1.043l-.01.01Zm-18.244.04H63.68v-5.145l-1.634 3.306H60.83l-1.648-3.31v5.15h-1.808v-9.131h1.768l2.3 4.844 2.279-4.844h1.773v9.13Zm9.898 0h-1.808v-5.145L71.95 42.51h-1.222l-1.643-3.31v5.15H67.27v-9.131h1.774l2.294 4.844 2.28-4.844h1.772v9.13Zm42.936-.04c-.977 0-1.773-.327-2.435-1.007-.886-.904-.886-1.998-.886-3.515v-.245c0-1.518 0-2.611.886-3.516.662-.674 1.458-1.001 2.435-1.001.977 0 1.758.327 2.42 1.001.896.915.896 2.034.896 3.577v.123c0 1.543 0 2.662-.896 3.576-.662.675-1.453 1.007-2.42 1.007Zm0-7.629c-.441 0-.837.169-1.092.47-.321.363-.416.741-.416 2.52 0 1.778.095 2.15.416 2.513.255.302.651.47 1.092.47.441 0 .822-.168 1.082-.47.326-.368.426-.766.426-2.519 0-1.752-.1-2.15-.426-2.519-.26-.301-.641-.47-1.082-.47v.005Zm-10.775 7.67h-1.814v-7.475h-2.319v-1.656h6.452v1.655h-2.319v7.476Zm22.507 0h-1.608l-3.456-5.457v5.457h-1.809v-9.131h1.603l3.457 5.452v-5.452h1.813v9.13Zm-52.994-6.74v-1.216c.01-.577-.166-.843-.587-1.093l-.02-.01s-.01-.02-.01-.031c0-.026.016-.041.04-.041h1.063c.71 0 1.292.245 1.327 1.993v7.143h-1.813v-6.745Zm-23.054 0v-1.216c.01-.577-.165-.843-.586-1.093l-.02-.01s-.01-.02-.01-.031c0-.026.015-.041.04-.041h1.062c.717 0 1.293.245 1.328 1.993v7.143H54.01v-6.745Zm57.488 0v-1.216c.01-.577-.165-.843-.586-1.093l-.02-.01s-.01-.02-.01-.031c0-.026.015-.041.035-.041h1.062c.711 0 1.293.245 1.328 1.993v7.143h-1.814v-6.745h.005Zm-16.13 6.74h-2.094l-1.733-3.613H90.36v3.613h-1.814v-9.136h3.517c1.718 0 2.92 1.155 2.92 2.81 0 1.114-.6 2.008-1.603 2.402l1.989 3.924Zm-5.014-5.166h1.593c.73 0 1.222-.465 1.222-1.155s-.491-1.154-1.222-1.154h-1.593v2.309Z"></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h156.25v50H0z"></path>
                  </clipPath>
                </defs>
              </svg>

              <svg
                className="header__logo-desktop"
                aria-label="Immigration New Zealand logo"
                width="200"
                height="64"
                viewBox="0 0 200 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#1E222C" clipPath="url(#a)">
                  <path d="M11.048 47.597c.128-.157 2.79 10.759 17.607 8.895-2.904-7.11-11.958-11.766-14.055-11.897.398-.314 3.008-2.29 3.43-2.531-.564 1.923 7.939 9.954 14.511 7.73-1.75-5.441-8.97-10.039-10.836-10.11.782-.406 1.564-1.04 2.379-1.433-.43 1.033 5.822 7.253 12.503 6.756.064-3.224-7.169-9.385-8.566-8.895.666-.36 1.686-.968 1.994-1.125.949 2.224 7.117 6.972 11.362 6.194-3.475-7.476-7.9-7.92-7.938-7.927 1.173-.569 1.872-.929 2.084-1.027.012 2.008 6.085 6.534 10.323 5.475-.86-3.33-4.2-6.573-7.476-6.88l2.237-1.08c-.346.628 4.79 4.984 9.65 4.709-2.346-5.795-5.565-5.919-6.72-6.141.655-.301 1.367-.7 2.053-1.066.275.739 2.923 4.565 9.33 3.597-1.617-3.532-4.996-4.71-6.772-4.834.91-.549 1.59-.778 2.25-1.157.456.536 2.052 3.983 8.554 2.727-1.378-3.348-4.36-4.146-5.527-4.375.552-.34 1.2-.7 1.635-.962.436.766 3.745 3.179 7.316 2.172-.686-2.021-3.218-3.231-5.488-3.31a40.698 40.698 0 0 0 1.898-1.327c.327.785 2.27 2.668 6.784 1.406-1.45-2.884-5.156-2.531-5.194-2.512.891-.673 1.148-.909 1.846-1.458.07.033 2.161 3.002 5.816.935-1.103-1.707-2.725-2.616-4.405-2.165.494-.497.917-.857 1.327-1.327-.16.431 2.719 1.975 5.252-.027-1.212-1.196-2.54-1.497-3.982-1.406.288-.425.372-.392.757-.909 0 0 2.263 1.72 4.405-.418-1.745-1.322-3.764-.478-3.77-.478l.826-1.295c.366.49 2.809.962 3.662-.7-.706-.693-2.898-.457-3.13-.294.071-.065.27-.543.398-.798 4.52.563 2.975-4.794 1.956-7.809-17.037 26.384-39.697 7.718-67.41 24.304-1.295 3.427-1.763 7.004-1.423 10.732.038.367.032.654.18 1.485-.052.255.307 2.296 1.044 4.565.545 1.615 1.161 2.701 1.84 4.369.405-.307.866-.66 1.18-.942-1.237-1.792-5.405-12.655-.23-18.993 4.911-.085 5.47 14.212 4.648 15.73.032 0 2.283-1.544 3.155-2.093-1.051-.425-4.77-12.852 1.436-18.012 0 0 5.534 2.158 3.232 15.265.943-.628 2.264-1.197 3.565-1.877-.705-1.25-4.488-10.635 1.565-15.533 3.257 1.36 3.09 11.615 1.814 13.852 1.046-.497 2.168-1.092 3.213-1.576-1.911-.896-1.764-10.543 1.455-13.172 3.585 3.433 2.713 9.202 1.815 11.726 0 0 2.712-1.144 2.693-1.138-2.135-4.1-1.141-9.064 1.141-11.02 1.75 1.145 2.232 4.447 1.43 9.921.763-.313 1.2-.542 1.95-.824-.469-.902-1.7-6.488 1.455-9.496 2.821 1.367 1.821 7.58 1.61 8.215.025-.046 1.654-.654 1.628-.707-.551-1.21-.943-5.808 1.66-8.025 1.033.752 2.123 2.845 1.142 6.809.603-.301 1.257-.563 1.872-.85-.878-1.001-.243-5.037 1.084-6.652 1.59.713 2.27 4.205 1.7 5.363.397-.203.91-.458 1.557-.83-.506-.818-.673-4.579.885-5.606 1.526 1.066 1.372 3.82 1.315 4.435.436-.288 1.712-.955 1.686-.975-.84-.765-1.244-3.29.564-4.813 1.571.353 1.603 3.348 1.469 3.544a49.183 49.183 0 0 0 2.084-1.497c-1.443-.32-1.276-2.682-.494-3.728.955.202 1.628.791 1.943 2.53.372-.346 1.25-1.072 1.52-1.392-.873-.072-1.963-2.002-.616-3.27.404.17 1.648.706 1.77 2.073.179-.13.833-.975.942-1.125-.596-.222-1.27-2.073-.648-2.884.828-.079 1.559 1.06 1.674 1.537l.808-1.197c-.462-.386-1.424-1.498-.577-2.472.93.045 1.263.765 1.462 1.438-9.388 18.738-47.283 21.95-67.057 44.48 0 0-2.059 2.192-2.059 3.238v7.607h.398c1-2.858 4.2-10.131 10.638-15.442M83.1-.003c-2.225.052-3.995 1.949-3.943 4.212.05 2.263 1.91 4.068 4.142 4.009 2.231-.052 4-1.942 3.943-4.212-.058-2.27-1.917-4.068-4.148-4.01h.006Zm3.668 4.022c.044 1.995-1.514 3.67-3.476 3.715-1.968.046-3.603-1.543-3.654-3.532-.052-2.001 1.506-3.669 3.475-3.715 1.962-.045 3.603 1.537 3.655 3.532Z"></path>
                  <path d="M82.69 3.274v-.491h-2.123v.49h.789v2.525h.526V3.274h.808Zm2.95 2.524V2.783h-.546l-.872 1.714-.865-1.714h-.533v3.015h.532V3.83l.629 1.263h.487l.622-1.263V5.8h.545Zm108.414 34.644h-5.098V26.066h5.098c1.564 0 2.847.478 3.738 1.38 1.449 1.485 1.443 3.297 1.43 5.213v1.073c0 1.981.025 3.845-1.43 5.33-.891.903-2.18 1.38-3.738 1.38Zm-2.251-2.603h2.001c.885 0 1.519-.268 1.994-.857.5-.621.577-1.622.577-3.787s-.083-3.047-.577-3.662c-.481-.589-1.109-.857-1.994-.857h-2.001v9.163Zm-56.124 2.603h-9.323v-9.62c0-.962-.013-2.878.436-3.604.487-.766 1.109-1.152 2.327-1.152h6.566v2.603h-5.072c-.353 0-.737.079-1.026.367-.282.287-.378.863-.378 1.242v1.603h5.514v2.61h-5.514v3.335h6.476v2.603l-.006.013ZM91.263 26.066h-9.324v9.628c0 .961-.019 2.877.43 3.597.487.772 1.11 1.15 2.328 1.15h6.572V37.84h-5.072c-.36 0-.744-.079-1.026-.36-.282-.294-.372-.87-.372-1.249v-1.602h5.514v-2.603H84.8v-3.342h6.476v-2.604l-.013-.013Zm69.063 11.773v2.603h-9.188V27.924c.013-.91-.263-1.328-.917-1.727l-.032-.013s-.019-.033-.019-.052c0-.04.025-.066.058-.066h1.673c1.116 0 2.02.354 2.084 3.1v8.673h6.341Zm-81.298 2.603h-2.526l-5.437-8.594v8.594h-2.847V26.066h2.52l5.437 8.581v-8.58h2.853v14.375Zm104.145-7.933v-4.86c-.052-.745-.231-1.144-.815-1.445l-.032-.013s-.019-.033-.019-.053c0-.039.026-.065.058-.065h1.641c1.321-.052 1.988.955 2.013 3.008V40.45h-2.526l-5.437-8.594v8.594h-2.847V26.073h2.526l5.431 8.58v-2.138l.007-.006Zm-14.056-5.036c-.314-.942-.878-1.413-1.686-1.407h-1.045l-5.123 14.376h2.981l.84-2.518h4.873l.827 2.518h2.982l-4.642-12.97h-.007Zm-3.231 7.979 1.68-4.932 1.622 4.932h-3.302Zm-20.859-7.98c-.314-.941-.878-1.412-1.686-1.406h-1.045l-5.13 14.376h2.975l.847-2.518h4.873l.827 2.518h2.975l-4.636-12.97Zm-3.231 7.98 1.686-4.932 1.622 4.932h-3.308Zm-43.525-.576 2.501-8.81h2.135l2.5 8.81 2.136-8.81h2.975l-3.783 14.376h-2.366l-2.527-8.49-2.526 8.49h-2.372l-3.232-12.329c-.308-1.203-.66-1.595-1.456-1.916l-.032-.013s-.025-.033-.025-.052c0-.04.025-.072.057-.072h1.885c1.353.013 2.155.674 2.456 1.988l1.661 6.822.013.006Zm24.994-5.036c.532-.942.898-2.093.93-2.989v-.785h-9.054v2.603h5.655l-5.912 9.451v2.322h9.311v-2.603h-5.938l5.002-7.999h.006ZM129.35 46.224c-.257-.766-.712-1.145-1.372-1.145h-.853l-4.168 11.694h2.424l.686-2.054h3.969l.667 2.054h2.424l-3.777-10.55Zm-2.629 6.494 1.366-4.01 1.321 4.01h-2.687Zm-19.538 3.996c-1.205 0-2.231-.425-3.058-1.269-1.116-1.138-1.116-2.524-1.116-4.44v-.315c0-1.916 0-3.296 1.116-4.44.834-.85 1.834-1.27 3.058-1.27 1.494 0 2.399.387 3.469 1.479l.039.033-1.552 1.582-.032-.039c-.641-.654-1.09-.961-1.917-.961-.552 0-1.039.209-1.366.588-.404.458-.526.93-.526 3.179 0 2.25.129 2.74.526 3.192.321.372.802.575 1.366.575.603 0 1.077-.203 1.462-.628.391-.438.474-1.066.474-1.524v-.353h-1.981v-1.962h4.27v1.688c0 1.74-.295 2.733-1.051 3.538-.834.883-1.898 1.334-3.168 1.334l-.013.013Zm-23.352.052H81.51V50.18l-2.09 4.232H77.86l-2.11-4.238v6.592h-2.314V45.08H75.7l2.944 6.2 2.917-6.2h2.27v11.687Zm12.67 0h-2.315V50.18l-2.09 4.232h-1.565l-2.103-4.238v6.592h-2.32V45.08h2.269l2.937 6.2 2.917-6.2h2.27v11.687Zm54.958-.052c-1.251 0-2.27-.419-3.117-1.288-1.135-1.158-1.135-2.558-1.135-4.5v-.314c0-1.942 0-3.342 1.135-4.5.847-.863 1.866-1.282 3.117-1.282 1.25 0 2.25.419 3.097 1.282 1.147 1.171 1.147 2.603 1.147 4.578v.157c0 1.976 0 3.408-1.147 4.579-.847.863-1.86 1.288-3.097 1.288Zm0-9.764c-.565 0-1.071.215-1.398.601-.411.465-.532.948-.532 3.224 0 2.277.121 2.754.532 3.218.327.386.833.602 1.398.602.564 0 1.051-.216 1.385-.602.416-.47.545-.98.545-3.224 0-2.243-.129-2.753-.545-3.224-.334-.386-.821-.602-1.385-.602v.007Zm-13.793 9.816h-2.321v-9.568h-2.969v-2.119h8.259v2.119h-2.969v9.568Zm28.81 0h-2.059l-4.424-6.985v6.985h-2.315V45.08h2.052l4.424 6.978V45.08h2.322v11.687ZM98.643 48.14v-1.557c.013-.739-.212-1.079-.75-1.4l-.026-.013s-.013-.026-.013-.039c0-.032.02-.052.051-.052h1.36c.91 0 1.654.314 1.699 2.55v9.144h-2.321V48.14Zm-29.508 0v-1.557c.012-.739-.212-1.079-.75-1.4l-.026-.013s-.013-.026-.013-.039c0-.032.02-.052.051-.052h1.36c.916 0 1.654.314 1.699 2.55v9.144h-2.322V48.14Zm73.584 0v-1.557c.013-.739-.212-1.079-.75-1.4l-.026-.013s-.013-.026-.013-.039c0-.032.02-.052.045-.052h1.36c.91 0 1.654.314 1.699 2.55v9.144h-2.321V48.14h.006Zm-20.647 8.626h-2.68l-2.219-4.623h-1.513v4.623h-2.321V45.072h4.501c2.2 0 3.738 1.478 3.738 3.598 0 1.425-.769 2.57-2.051 3.073l2.545 5.023Zm-6.418-6.612h2.039c.936 0 1.564-.595 1.564-1.478s-.628-1.478-1.564-1.478h-2.039v2.956Z"></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h200v64H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </Link>

            <nav
              className="header-quicklinks"
              id="secondary-nav"
              aria-label="Header quick links"
            >
              {status !== "authenticated" && (
                <ul className="header-quicklinks__items">
                  <li className="header-quicklinks__item">
                    <Link
                      className="header-quicklinks__link"
                      href="/process-to-apply/"
                    >
                      Process to apply
                    </Link>
                  </li>

                  <li className="header-quicklinks__item">
                    <Link
                      className="header-quicklinks__link"
                      href="/work/for-employers/"
                    >
                      For employers
                    </Link>
                  </li>
                </ul>
              )}
              {status === "authenticated" ? (
                <div className="mobile-menu-login" style={{ display: "flex" }}>
                  <button
                    onClick={() => signOut()}
                    style={{
                      backgroundColor: "#0062a4",
                      color: "#fff",
                      border: "none",
                      padding: "0 20px",
                      fontWeight: "bold",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    LOG OUT
                  </button>
                </div>
              ) : (
                <button
                  className="modal__button--wrapper header-quicklinks__button"
                  aria-label="Open login modal"
                  aria-controls="modal-login"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
              )}
            </nav>
          </div>
          {status === "authenticated" ? (
            <div
              style={{ borderBottom: "1px solid #eaeaea", marginTop: "-1px" }}
            >
              <nav
                style={{
                  display: "flex",
                  gap: "80px",
                  width: "100%",
                  alignItems: "center",
                  height: "60px",
                }}
              >
                <Link
                  href="/dashboard"
                  style={{
                    fontWeight: "bold",
                    color: pathname === "/dashboard" ? "#1E222C" : "#6b7280",
                    textDecoration: "none",
                    borderBottom:
                      pathname === "/dashboard"
                        ? "3px solid #1E222C"
                        : "3px solid transparent",
                    paddingBottom: "18px",
                    paddingTop: "18px",
                    fontSize: "15px",
                  }}
                >
                  My dashboard
                </Link>
                <Link
                  href="/visas"
                  style={{
                    fontWeight: "bold",
                    color: pathname === "/visas" ? "#1E222C" : "#6b7280",
                    textDecoration: "none",
                    borderBottom:
                      pathname === "/visas"
                        ? "3px solid #1E222C"
                        : "3px solid transparent",
                    paddingBottom: "18px",
                    paddingTop: "18px",
                    fontSize: "15px",
                  }}
                >
                  My visas
                </Link>
                {session?.user &&
                  ((session.user as any).role === "admin" ||
                    (session.user as any).role === "employee") && (
                    <Link
                      href="/employers"
                      style={{
                        fontWeight: "bold",
                        color: pathname?.startsWith("/employers")
                          ? "#1E222C"
                          : "#6b7280",
                        textDecoration: "none",
                        borderBottom: pathname?.startsWith("/employers")
                          ? "3px solid #1E222C"
                          : "3px solid transparent",
                        paddingBottom: "18px",
                        paddingTop: "18px",
                        fontSize: "15px",
                      }}
                    >
                      Employ migrants
                    </Link>
                  )}
                <Link
                  href="/sponsorships"
                  style={{
                    fontWeight: "bold",
                    color: pathname === "/sponsorships" ? "#1E222C" : "#6b7280",
                    textDecoration: "none",
                    borderBottom:
                      pathname === "/sponsorships"
                        ? "3px solid #1E222C"
                        : "3px solid transparent",
                    paddingBottom: "18px",
                    paddingTop: "18px",
                    fontSize: "15px",
                  }}
                >
                  My sponsorships
                </Link>
              </nav>
            </div>
          ) : (
            <div className="header__bottom">
              <nav className="nav" id="nav" aria-label="Header navigation">
                <ul className="nav__items">
                  <li
                    className={`nav__item ${pathname?.startsWith("/visit") ? "nav__item--current" : ""} ${activeMenu === "menu-1" ? "nav__item--active" : ""}`}
                  >
                    <button
                      className="nav__link"
                      aria-controls="menu-1"
                      aria-expanded={activeMenu === "menu-1"}
                      onClick={() => toggleMenu("menu-1")}
                    >
                      <span className="navigation__title">
                        <span className="navigation navigation--primary">
                          Visit
                        </span>
                        <span className="navigation navigation--alt">Toro</span>
                        <span className="navigation__chevron">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 12 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                          </svg>
                        </span>
                      </span>
                    </button>
                    <div
                      id="menu-1"
                      className={`mega-nav__holder w-[100vw] h-[100vh] bg--darkest-blue ${activeMenu === "menu-1" ? "mega-nav--active" : ""}`}
                    >
                      <div className="mega-nav container">
                        <div className="mega-nav__actions">
                          <button
                            className="mega-nav__close"
                            aria-controls="menu-1"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span
                              className="mega-nav__close-icon"
                              aria-label="Close navigation"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8 0C12.4153 0 16 3.58467 16 8C16 12.4153 12.4153 16 8 16C3.58467 16 0 12.4153 0 8C0 3.58467 3.58467 0 8 0ZM8 0.666667C12.0473 0.666667 15.3333 3.95267 15.3333 8C15.3333 12.0473 12.0473 15.3333 8 15.3333C3.95267 15.3333 0.666667 12.0473 0.666667 8C0.666667 3.95267 3.95267 0.666667 8 0.666667ZM8 7.52867L11.5287 4L12 4.47133L8.47133 8L12 11.5287L11.5287 12L8 8.47133L4.47133 12L4 11.5287L7.52867 8L4 4.47133L4.47133 4L8 7.52867Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                            <span className="mega-nav__close-text">Close</span>
                          </button>
                        </div>
                        <div className="mega-nav__content">
                          <div className="mega-nav__page-info">
                            <Link
                              href="/visit/"
                              className="navigation__page-title"
                            >
                              <span className="navigation navigation--primary">
                                Visit
                              </span>
                              <span className="navigation navigation--alt">
                                Toro
                              </span>
                              <span
                                className="navigation__arrow"
                                role="presentation"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </Link>

                            <p className="paragraph">
                              Learn what you need to do to visit New Zealand.
                              Find out whether you need a visa or a New Zealand
                              Electronic Travel Authority (NZeTA), and what you
                              must do before travelling here, and on arrival.
                            </p>
                          </div>

                          <nav className="mega-nav__items">
                            <ul className="mega-nav__links">
                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  What you need to visit New Zealand
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Checking or changing the conditions of your
                                  visitor visa or NZeTA
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Visiting on business
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Transiting through New Zealand
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Crew travelling to New Zealand
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <span className="mega-nav__pattern"></span>
                    </div>
                  </li>

                  <li
                    className={`nav__item ${pathname?.startsWith("/study") ? "nav__item--current" : ""} ${activeMenu === "menu-2" ? "nav__item--active" : ""}`}
                  >
                    <button
                      className="nav__link"
                      aria-controls="menu-2"
                      aria-expanded={activeMenu === "menu-2"}
                      onClick={() => toggleMenu("menu-2")}
                    >
                      <span className="navigation__title">
                        <span className="navigation navigation--primary">
                          Study
                        </span>
                        <span className="navigation navigation--alt">Ako</span>
                        <span className="navigation__chevron">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 12 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                          </svg>
                        </span>
                      </span>
                    </button>
                    <div
                      id="menu-2"
                      className={`mega-nav__holder w-[100vw] h-[100vh] bg--darkest-blue ${activeMenu === "menu-2" ? "mega-nav--active" : ""}`}
                    >
                      <div className="mega-nav container">
                        <div className="mega-nav__actions">
                          <button
                            className="mega-nav__close"
                            aria-controls="menu-2"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span
                              className="mega-nav__close-icon"
                              aria-label="Close navigation"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8 0C12.4153 0 16 3.58467 16 8C16 12.4153 12.4153 16 8 16C3.58467 16 0 12.4153 0 8C0 3.58467 3.58467 0 8 0ZM8 0.666667C12.0473 0.666667 15.3333 3.95267 15.3333 8C15.3333 12.0473 12.0473 15.3333 8 15.3333C3.95267 15.3333 0.666667 12.0473 0.666667 8C0.666667 3.95267 3.95267 0.666667 8 0.666667ZM8 7.52867L11.5287 4L12 4.47133L8.47133 8L12 11.5287L11.5287 12L8 8.47133L4.47133 12L4 11.5287L7.52867 8L4 4.47133L4.47133 4L8 7.52867Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                            <span className="mega-nav__close-text">Close</span>
                          </button>
                        </div>
                        <div className="mega-nav__content">
                          <div className="mega-nav__page-info">
                            <Link
                              href="/study/"
                              className="navigation__page-title"
                            >
                              <span className="navigation navigation--primary">
                                Study
                              </span>
                              <span className="navigation navigation--alt">
                                Ako
                              </span>
                              <span
                                className="navigation__arrow"
                                role="presentation"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </Link>

                            <p className="paragraph">
                              Find out about visas that let you study in New
                              Zealand. If you are an education provider, learn
                              about the rules for bringing students to New
                              Zealand.{" "}
                            </p>
                          </div>

                          <nav className="mega-nav__items">
                            <ul className="mega-nav__links">
                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Study visas
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Once you have a student visa
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  After you finish your study
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  For education providers
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <span className="mega-nav__pattern"></span>
                    </div>
                  </li>

                  <li
                    className={`nav__item ${pathname?.startsWith("/work") ? "nav__item--current" : ""} ${activeMenu === "menu-3" ? "nav__item--active" : ""}`}
                  >
                    <button
                      className="nav__link"
                      aria-controls="menu-3"
                      aria-expanded={activeMenu === "menu-3"}
                      onClick={() => toggleMenu("menu-3")}
                    >
                      <span className="navigation__title">
                        <span className="navigation navigation--primary">
                          Work
                        </span>
                        <span className="navigation navigation--alt">Mahi</span>
                        <span className="navigation__chevron">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 12 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                          </svg>
                        </span>
                      </span>
                    </button>
                    <div
                      id="menu-3"
                      className={`mega-nav__holder w-[100vw] h-[100vh] bg--darkest-blue ${activeMenu === "menu-3" ? "mega-nav--active" : ""}`}
                    >
                      <div className="mega-nav container">
                        <div className="mega-nav__actions">
                          <button
                            className="mega-nav__close"
                            aria-controls="menu-3"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span
                              className="mega-nav__close-icon"
                              aria-label="Close navigation"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8 0C12.4153 0 16 3.58467 16 8C16 12.4153 12.4153 16 8 16C3.58467 16 0 12.4153 0 8C0 3.58467 3.58467 0 8 0ZM8 0.666667C12.0473 0.666667 15.3333 3.95267 15.3333 8C15.3333 12.0473 12.0473 15.3333 8 15.3333C3.95267 15.3333 0.666667 12.0473 0.666667 8C0.666667 3.95267 3.95267 0.666667 8 0.666667ZM8 7.52867L11.5287 4L12 4.47133L8.47133 8L12 11.5287L11.5287 12L8 8.47133L4.47133 12L4 11.5287L7.52867 8L4 4.47133L4.47133 4L8 7.52867Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                            <span className="mega-nav__close-text">Close</span>
                          </button>
                        </div>
                        <div className="mega-nav__content">
                          <div className="mega-nav__page-info">
                            <Link
                              href="/work/"
                              className="navigation__page-title"
                            >
                              <span className="navigation navigation--primary">
                                Work
                              </span>
                              <span className="navigation navigation--alt">
                                Mahi
                              </span>
                              <span
                                className="navigation__arrow"
                                role="presentation"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </Link>

                            <p className="paragraph">
                              Find information about work visas and working in
                              New Zealand. Employers can learn about hiring
                              people from overseas and getting accredited.
                            </p>
                          </div>

                          <nav className="mega-nav__items">
                            <ul className="mega-nav__links">
                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Visas for working in New Zealand
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Working holiday visas
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Finding work in New Zealand
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Requirements for work visas
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="/work/for-employers/"
                                >
                                  For employers
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Worker rights
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Visas for investing and doing business in New
                                  Zealand
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Protecting yourself from immigration scams
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <span className="mega-nav__pattern"></span>
                    </div>
                  </li>

                  <li
                    className={`nav__item ${pathname?.startsWith("/live") ? "nav__item--current" : ""} ${activeMenu === "menu-4" ? "nav__item--active" : ""}`}
                  >
                    <button
                      className="nav__link"
                      aria-controls="menu-4"
                      aria-expanded={activeMenu === "menu-4"}
                      onClick={() => toggleMenu("menu-4")}
                    >
                      <span className="navigation__title">
                        <span className="navigation navigation--primary">
                          Live
                        </span>
                        <span className="navigation navigation--alt">Ora</span>
                        <span className="navigation__chevron">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 12 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                          </svg>
                        </span>
                      </span>
                    </button>
                    <div
                      id="menu-4"
                      className={`mega-nav__holder w-[100vw] h-[100vh] bg--darkest-blue ${activeMenu === "menu-4" ? "mega-nav--active" : ""}`}
                    >
                      <div className="mega-nav container">
                        <div className="mega-nav__actions">
                          <button
                            className="mega-nav__close"
                            aria-controls="menu-4"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span
                              className="mega-nav__close-icon"
                              aria-label="Close navigation"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8 0C12.4153 0 16 3.58467 16 8C16 12.4153 12.4153 16 8 16C3.58467 16 0 12.4153 0 8C0 3.58467 3.58467 0 8 0ZM8 0.666667C12.0473 0.666667 15.3333 3.95267 15.3333 8C15.3333 12.0473 12.0473 15.3333 8 15.3333C3.95267 15.3333 0.666667 12.0473 0.666667 8C0.666667 3.95267 3.95267 0.666667 8 0.666667ZM8 7.52867L11.5287 4L12 4.47133L8.47133 8L12 11.5287L11.5287 12L8 8.47133L4.47133 12L4 11.5287L7.52867 8L4 4.47133L4.47133 4L8 7.52867Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                            <span className="mega-nav__close-text">Close</span>
                          </button>
                        </div>
                        <div className="mega-nav__content">
                          <div className="mega-nav__page-info">
                            <Link
                              href="/live/"
                              className="navigation__page-title"
                            >
                              <span className="navigation navigation--primary">
                                Live
                              </span>
                              <span className="navigation navigation--alt">
                                Ora
                              </span>
                              <span
                                className="navigation__arrow"
                                role="presentation"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </Link>

                            <p className="paragraph">
                              Find visas to live in Aotearoa New Zealand. Get
                              information about living here permanently and what
                              life in Aotearoa is like.
                            </p>
                          </div>

                          <nav className="mega-nav__items">
                            <ul className="mega-nav__links">
                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Moving to New Zealand{" "}
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Resident visas to live in New Zealand
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Refugees and asylum seeker information
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Setting up your life in New Zealand
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Staying safe and knowing your rights
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Where to apply for New Zealand citizenship and
                                  a passport
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <span className="mega-nav__pattern"></span>
                    </div>
                  </li>

                  <li
                    className={`nav__item ${pathname?.startsWith("/about-us") ? "nav__item--current" : ""} ${activeMenu === "menu-5" ? "nav__item--active" : ""}`}
                  >
                    <button
                      className="nav__link"
                      aria-controls="menu-5"
                      aria-expanded={activeMenu === "menu-5"}
                      onClick={() => toggleMenu("menu-5")}
                    >
                      <span className="navigation__title">
                        <span className="navigation navigation--primary">
                          About us
                        </span>
                        <span className="navigation navigation--alt"></span>
                        <span className="navigation__chevron">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 12 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                          </svg>
                        </span>
                      </span>
                    </button>
                    <div
                      id="menu-5"
                      className={`mega-nav__holder w-[100vw] h-[100vh] bg--darkest-blue ${activeMenu === "menu-5" ? "mega-nav--active" : ""}`}
                    >
                      <div className="mega-nav container">
                        <div className="mega-nav__actions">
                          <button
                            className="mega-nav__close"
                            aria-controls="menu-5"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span
                              className="mega-nav__close-icon"
                              aria-label="Close navigation"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8 0C12.4153 0 16 3.58467 16 8C16 12.4153 12.4153 16 8 16C3.58467 16 0 12.4153 0 8C0 3.58467 3.58467 0 8 0ZM8 0.666667C12.0473 0.666667 15.3333 3.95267 15.3333 8C15.3333 12.0473 12.0473 15.3333 8 15.3333C3.95267 15.3333 0.666667 12.0473 0.666667 8C0.666667 3.95267 3.95267 0.666667 8 0.666667ZM8 7.52867L11.5287 4L12 4.47133L8.47133 8L12 11.5287L11.5287 12L8 8.47133L4.47133 12L4 11.5287L7.52867 8L4 4.47133L4.47133 4L8 7.52867Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                            <span className="mega-nav__close-text">Close</span>
                          </button>
                        </div>
                        <div className="mega-nav__content">
                          <div className="mega-nav__page-info">
                            <Link
                              href="/about-us/"
                              className="navigation__page-title"
                            >
                              <span className="navigation navigation--primary">
                                About us
                              </span>
                              <span className="navigation navigation--alt"></span>
                              <span
                                className="navigation__arrow"
                                role="presentation"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 23 17"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </Link>
                          </div>

                          <nav className="mega-nav__items">
                            <ul className="mega-nav__links">
                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  News centre
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  How we work
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Our strategies and programmes
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  International cooperation
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Information for industry, embassies and
                                  consulates
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Research and statistics
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  About this site
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Glossary
                                </Link>
                              </li>

                              <li className="mega-nav__item">
                                <Link
                                  className="navigation navigation--child-link"
                                  href="#"
                                  data-disabled="true"
                                >
                                  Immigration policy and law
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <span className="mega-nav__pattern"></span>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="header__actions">
                <div
                  data-tag="mobile-nav-component"
                  className="mobile-nav mobile-nav__modal"
                  data-modal-id={"1"}
                  data-variant-classname="bg--darkest-blue"
                  data-button-classname="header__actions-button header__actions-button--menu"
                  data-button-label="Open menu"
                  data-show-logo="true"
                >
                  <div>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 1.333C0 .597.597 0 1.333 0H20a1.333 1.333 0 1 1 0 2.667H1.333A1.333 1.333 0 0 1 0 1.333ZM0 8c0-.736.597-1.333 1.333-1.333H20a1.333 1.333 0 1 1 0 2.666H1.333A1.333 1.333 0 0 1 0 8Zm0 6.667c0-.737.597-1.334 1.333-1.334H20A1.333 1.333 0 0 1 20 16H1.333A1.333 1.333 0 0 1 0 14.667Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="mobile-nav mobile-nav__container">
                      <div className="mobile-nav__content">
                        <nav
                          className="mobile-nav"
                          aria-label="Mobile navigation"
                        >
                          <ul className="mobile-nav__items">
                            <div
                              data-tag="mobile-menu-item"
                              data-position="1"
                              data-url="/visit/"
                              data-chevron-button-label="Visit - Toro"
                              data-has-sub-menu="1"
                              data-on-menu-close="handleSubmenuClose"
                            >
                              <div>
                                <span className="navigation navigation--primary">
                                  Visit
                                </span>
                                <span className="navigation navigation--alt">
                                  Toro
                                </span>
                              </div>
                              <div>
                                <div className="mobile-nav__content">
                                  <div className="mobile-nav__page-info">
                                    <Link
                                      href="/visit/"
                                      className="navigation__page-title"
                                    >
                                      <span className="navigation navigation--primary">
                                        Visit
                                      </span>
                                      <span className="navigation navigation--alt">
                                        Toro
                                      </span>
                                      <span
                                        className="navigation__arrow"
                                        role="presentation"
                                      >
                                        <svg
                                          aria-hidden="true"
                                          focusable="false"
                                          viewBox="0 0 23 17"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z" />
                                        </svg>
                                      </span>
                                    </Link>

                                    <p className="paragraph">
                                      Learn what you need to do to visit New
                                      Zealand. Find out whether you need a visa
                                      or a New Zealand Electronic Travel
                                      Authority (NZeTA), and what you must do
                                      before travelling here, and on arrival.
                                    </p>
                                  </div>

                                  <nav className="mobile-nav__items mobile-nav__items">
                                    <ul className="mobile-nav__links">
                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          What you need to visit New Zealand
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Checking or changing the conditions of
                                          your visitor visa or NZeTA
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Visiting on business
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Transiting through New Zealand
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Crew travelling to New Zealand
                                        </Link>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                              </div>
                            </div>

                            <div
                              data-tag="mobile-menu-item"
                              data-position="2"
                              data-url="/study/"
                              data-chevron-button-label="Study - Ako"
                              data-has-sub-menu="1"
                              data-on-menu-close="handleSubmenuClose"
                            >
                              <div>
                                <span className="navigation navigation--primary">
                                  Study
                                </span>
                                <span className="navigation navigation--alt">
                                  Ako
                                </span>
                              </div>
                              <div>
                                <div className="mobile-nav__content">
                                  <div className="mobile-nav__page-info">
                                    <Link
                                      href="/study/"
                                      className="navigation__page-title"
                                    >
                                      <span className="navigation navigation--primary">
                                        Study
                                      </span>
                                      <span className="navigation navigation--alt">
                                        Ako
                                      </span>
                                      <span
                                        className="navigation__arrow"
                                        role="presentation"
                                      >
                                        <svg
                                          aria-hidden="true"
                                          focusable="false"
                                          viewBox="0 0 23 17"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z" />
                                        </svg>
                                      </span>
                                    </Link>

                                    <p className="paragraph">
                                      Find out about visas that let you study in
                                      New Zealand. If you are an education
                                      provider, learn about the rules for
                                      bringing students to New Zealand.{" "}
                                    </p>
                                  </div>

                                  <nav className="mobile-nav__items mobile-nav__items">
                                    <ul className="mobile-nav__links">
                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Study visas
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Once you have a student visa
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          After you finish your study
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          For education providers
                                        </Link>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                              </div>
                            </div>

                            <div
                              data-tag="mobile-menu-item"
                              data-position="3"
                              data-url="/work/"
                              data-chevron-button-label="Work - Mahi"
                              data-has-sub-menu="1"
                              data-on-menu-close="handleSubmenuClose"
                            >
                              <div>
                                <span className="navigation navigation--primary">
                                  Work
                                </span>
                                <span className="navigation navigation--alt">
                                  Mahi
                                </span>
                              </div>
                              <div>
                                <div className="mobile-nav__content">
                                  <div className="mobile-nav__page-info">
                                    <Link
                                      href="/work/"
                                      className="navigation__page-title"
                                    >
                                      <span className="navigation navigation--primary">
                                        Work
                                      </span>
                                      <span className="navigation navigation--alt">
                                        Mahi
                                      </span>
                                      <span
                                        className="navigation__arrow"
                                        role="presentation"
                                      >
                                        <svg
                                          aria-hidden="true"
                                          focusable="false"
                                          viewBox="0 0 23 17"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z" />
                                        </svg>
                                      </span>
                                    </Link>

                                    <p className="paragraph">
                                      Find information about work visas and
                                      working in New Zealand. Employers can
                                      learn about hiring people from overseas
                                      and getting accredited.
                                    </p>
                                  </div>

                                  <nav className="mobile-nav__items mobile-nav__items">
                                    <ul className="mobile-nav__links">
                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Visas for working in New Zealand
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Working holiday visas
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Finding work in New Zealand
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Requirements for work visas
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="/work/for-employers/"
                                        >
                                          For employers
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Worker rights
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Visas for investing and doing business
                                          in New Zealand
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Protecting yourself from immigration
                                          scams
                                        </Link>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                              </div>
                            </div>

                            <div
                              data-tag="mobile-menu-item"
                              data-position="4"
                              data-url="/live/"
                              data-chevron-button-label="Live - Ora"
                              data-has-sub-menu="1"
                              data-on-menu-close="handleSubmenuClose"
                            >
                              <div>
                                <span className="navigation navigation--primary">
                                  Live
                                </span>
                                <span className="navigation navigation--alt">
                                  Ora
                                </span>
                              </div>
                              <div>
                                <div className="mobile-nav__content">
                                  <div className="mobile-nav__page-info">
                                    <Link
                                      href="/live/"
                                      className="navigation__page-title"
                                    >
                                      <span className="navigation navigation--primary">
                                        Live
                                      </span>
                                      <span className="navigation navigation--alt">
                                        Ora
                                      </span>
                                      <span
                                        className="navigation__arrow"
                                        role="presentation"
                                      >
                                        <svg
                                          aria-hidden="true"
                                          focusable="false"
                                          viewBox="0 0 23 17"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z" />
                                        </svg>
                                      </span>
                                    </Link>

                                    <p className="paragraph">
                                      Find visas to live in Aotearoa New
                                      Zealand. Get information about living here
                                      permanently and what life in Aotearoa is
                                      like.
                                    </p>
                                  </div>

                                  <nav className="mobile-nav__items mobile-nav__items">
                                    <ul className="mobile-nav__links">
                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Moving to New Zealand{" "}
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Resident visas to live in New Zealand
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Refugees and asylum seeker information
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Setting up your life in New Zealand
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Staying safe and knowing your rights
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Where to apply for New Zealand
                                          citizenship and a passport
                                        </Link>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                              </div>
                            </div>

                            <div
                              data-tag="mobile-menu-item"
                              data-position="5"
                              data-url="/about-us/"
                              data-chevron-button-label="About us - "
                              data-has-sub-menu="1"
                              data-on-menu-close="handleSubmenuClose"
                            >
                              <div>
                                <span className="navigation navigation--primary">
                                  About us
                                </span>
                                <span className="navigation navigation--alt"></span>
                              </div>
                              <div>
                                <div className="mobile-nav__content">
                                  <div className="mobile-nav__page-info">
                                    <Link
                                      href="/about-us/"
                                      className="navigation__page-title"
                                    >
                                      <span className="navigation navigation--primary">
                                        About us
                                      </span>
                                      <span className="navigation navigation--alt"></span>
                                      <span
                                        className="navigation__arrow"
                                        role="presentation"
                                      >
                                        <svg
                                          aria-hidden="true"
                                          focusable="false"
                                          viewBox="0 0 23 17"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z" />
                                        </svg>
                                      </span>
                                    </Link>
                                  </div>

                                  <nav className="mobile-nav__items mobile-nav__items">
                                    <ul className="mobile-nav__links">
                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          News centre
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          How we work
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Our strategies and programmes
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          International cooperation
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Information for industry, embassies
                                          and consulates
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Research and statistics
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          About this site
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Glossary
                                        </Link>
                                      </li>

                                      <li className="mobile-nav__item--sub-nav">
                                        <Link
                                          className="navigation navigation--child-link"
                                          href="#"
                                          data-disabled="true"
                                        >
                                          Immigration policy and law
                                        </Link>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                              </div>
                            </div>
                          </ul>
                        </nav>

                        <nav
                          className="quicklinks"
                          aria-label="Mobile navigation quick links"
                        >
                          <ul className="quicklinks__items">
                            <li className="quicklinks__item">
                              <Link
                                className="quicklinks__link"
                                href="/process-to-apply/"
                              >
                                Process to apply
                              </Link>
                            </li>

                            <li className="quicklinks__item">
                              <Link
                                className="quicklinks__link"
                                href="/work/for-employers/"
                              >
                                For employers
                              </Link>
                            </li>
                          </ul>
                          <span id="mobile-menu-login">
                            <button
                              className="modal__button--wrapper"
                              aria-label="Open login modal"
                              aria-controls="modal-login"
                              data-on-click="handleLoginOpenButtonClick"
                            >
                              Login
                            </button>
                          </span>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="header__actions">
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </div>
      </header>
    </>
  );
}
