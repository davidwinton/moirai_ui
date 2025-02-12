"use client"
/*
 * Documentation:
 * Custom Tree View — https://app.subframe.com/007b7d1e11bb/library?component=Custom+Tree+View_a744851a-b097-4d38-a360-2892b89333b5
 */

import * as SubframeCore from "@subframe/core"
import React from "react"
import { Accordion } from "./Accordion"

interface FolderProps extends React.ComponentProps<typeof Accordion> {
  children?: React.ReactNode
  label?: string
  icon?: SubframeCore.IconName
  value?: string
  className?: string
}

const Folder = React.forwardRef<HTMLElement, FolderProps>(function Folder(
  { children, label, icon = "FeatherFolder", value, className, ...otherProps }: FolderProps,
  ref
) {
  return (
    <Accordion
      className={SubframeCore.twClassNames("group/9d70b169 cursor-pointer", className)}
      trigger={
        <div className="flex w-full items-center gap-2 rounded-md p-2 group-hover/9d70b169:bg-neutral-50">
          <Accordion.Chevron />
          {label ? (
            <span className="line-clamp-1 shrink-0 grow basis-0 font-body text-body text-default-font group-hover/9d70b169:font-body-bold group-hover/9d70b169:text-body-bold">
              {label}
            </span>
          ) : null}
          {value ? (
            <span className="text-right font-body text-body text-default-font group-hover/9d70b169:font-body-bold group-hover/9d70b169:text-body-bold">
              {value}
            </span>
          ) : null}
        </div>
      }
      defaultOpen={true}
      ref={ref as any}
      {...otherProps}
    >
      {children ? <div className="flex w-full flex-col items-start px-6">{children}</div> : null}
    </Accordion>
  )
})

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  value?: string
  className?: string
}

const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
  { label, value, className, ...otherProps }: ItemProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "group/ebb17dce flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 hover:bg-transparent",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {label ? (
        <span className="line-clamp-1 shrink-0 grow basis-0 font-caption text-caption text-subtext-color group-hover/ebb17dce:text-default-font">
          {label}
        </span>
      ) : null}
      {value ? (
        <span className="text-right font-caption text-caption text-subtext-color group-hover/ebb17dce:text-default-font">
          {value}
        </span>
      ) : null}
    </div>
  )
})

interface CustomTreeViewRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

const CustomTreeViewRoot = React.forwardRef<HTMLElement, CustomTreeViewRootProps>(function CustomTreeViewRoot(
  { children, className, ...otherProps }: CustomTreeViewRootProps,
  ref
) {
  return children ? (
    <div
      className={SubframeCore.twClassNames("flex w-full flex-col items-start", className)}
      ref={ref as any}
      {...otherProps}
    >
      {children}
    </div>
  ) : null
})

export const CustomTreeView = Object.assign(CustomTreeViewRoot, {
  Folder,
  Item,
})
