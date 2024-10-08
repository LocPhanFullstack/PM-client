"use client";

import classNames from "classnames";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { breadcrumbsData } from "./data";
import { Breadcrumb } from "./types";
import { Menu, MoveLeft, MoveRight, Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/app/redux";
import { setIsSidebarCollapsed } from "@/src/state";
import { ThemeToggler } from "../../ThemeToggler";

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const getLink = (items: Breadcrumb[], idx: number) => {
    if (idx === items.length - 1) {
      return pathName;
    } else {
      let link = breadcrumbsData[items[idx]].path;
      for (const [key, value] of Object.entries(params)) {
        link = link.replace(`:${key}`, String(value));
      }
      return link;
    }
  };

  return (
    <div className="flex select-none bg-background items-center gap-4 rounded-lg px-2 py-3 shadow">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          {!isSidebarCollapsed ? null : (
            <button
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <Menu className="h-8 w-8" />
            </button>
          )}
          <div className="flex items-center">
            <div
              onClick={() => router.back()}
              className="rounded-lg p-2 hover:alpha-5 active:alpha-10 hover:cursor-pointer"
            >
              <MoveLeft size={18} />
            </div>
            <div
              onClick={() => router.forward()}
              className="rounded-lg p-2 hover:alpha-5 active:alpha-10 hover:cursor-pointer"
            >
              <MoveRight size={18} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            {props.items.map((breadcrumb, idx) => {
              const item = breadcrumbsData[breadcrumb];
              const path = getLink(props.items, idx);
              return (
                <React.Fragment key={path}>
                  <Link href={path}>
                    <div
                      className={classNames(
                        "rounded-lg px-2.5 py-1 font-medium hover:alpha-5 active:alpha-10",
                        {
                          "text-tertiary opacity-90":
                            idx < props.items.length - 1,
                        }
                      )}
                    >
                      {item.label}
                    </div>
                  </Link>
                  {idx < props.items.length - 1 && <MoveRight size={18} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <ThemeToggler />
          <Link
            href="/settings"
            className="h-min w-min rounded p-2 hover:bg-content-surface"
          >
            <Settings className="h-6 w-6 cursor-pointer" />
          </Link>
          <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-content-surface md:inline-block"></div>
        </div>
      </div>
    </div>
  );
}
