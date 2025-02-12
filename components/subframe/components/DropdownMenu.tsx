"use client"
/*
 * Documentation:
 * Dropdown Menu — https://app.subframe.com/007b7d1e11bb/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 */

import * as SubframeCore from "@subframe/core"
import React from "react"

interface DropdownItemProps extends React.ComponentProps<typeof SubframeCore.DropdownMenu.Item> {
  children?: string
  icon?: SubframeCore.IconName
  className?: string
}

const DropdownItem = React.forwardRef<HTMLElement, DropdownItemProps>(function DropdownItem(
  { children, icon = "FeatherStar", className, ...otherProps }: DropdownItemProps,
  ref
) {
  return (
    <SubframeCore.DropdownMenu.Item asChild={true} {...otherProps}>
      <div
        className={SubframeCore.twClassNames(
          "group/adcae8d6 flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-3 hover:bg-neutral-100 active:bg-neutral-50 data-[highlighted]:bg-neutral-100",
          className
        )}
        ref={ref as any}
      >
        <SubframeCore.Icon className="font-body text-body text-default-font" name={icon} />
        {children ? (
          <span className="line-clamp-1 shrink-0 grow basis-0 font-body text-body text-default-font group-hover/adcae8d6:text-default-font">
            {children}
          </span>
        ) : null}
      </div>
    </SubframeCore.DropdownMenu.Item>
  )
})

interface DropdownDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const DropdownDivider = React.forwardRef<HTMLElement, DropdownDividerProps>(function DropdownDivider(
  { className, ...otherProps }: DropdownDividerProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames("flex w-full items-start gap-2 px-1 py-1", className)}
      ref={ref as any}
      {...otherProps}
    >
      <div className="flex h-px shrink-0 grow basis-0 flex-col items-center gap-2 bg-neutral-200" />
    </div>
  )
})

interface DropdownMenuRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

const DropdownMenuRoot = React.forwardRef<HTMLElement, DropdownMenuRootProps>(function DropdownMenuRoot(
  { children, className, ...otherProps }: DropdownMenuRootProps,
  ref
) {
  return children ? (
    <div
      className={SubframeCore.twClassNames(
        "flex min-w-[192px] flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background px-1 py-1 shadow-lg",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {children}
    </div>
  ) : null
})

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  DropdownItem,
  DropdownDivider,
})
