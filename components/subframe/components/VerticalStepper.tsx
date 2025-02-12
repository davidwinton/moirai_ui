"use client"
/*
 * Documentation:
 * Vertical Stepper — https://app.subframe.com/007b7d1e11bb/library?component=Vertical+Stepper_bdc0291d-b5be-40c5-ae2f-527a868488b2
 */

import * as SubframeCore from "@subframe/core"
import React from "react"

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "completed" | "active"
  stepNumber?: string
  label?: string
  firstStep?: boolean
  lastStep?: boolean
  children?: React.ReactNode
  className?: string
}

const Step = React.forwardRef<HTMLElement, StepProps>(function Step(
  {
    variant = "default",
    stepNumber,
    label,
    firstStep = false,
    lastStep = false,
    children,
    className,
    ...otherProps
  }: StepProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames("group/b094efab flex h-full w-full items-start gap-3", className)}
      ref={ref as any}
      {...otherProps}
    >
      <div
        className={SubframeCore.twClassNames("flex flex-col items-center gap-1 self-stretch", {
          "h-auto w-auto flex-none": lastStep,
        })}
      >
        <div
          className={SubframeCore.twClassNames(
            "flex h-2 w-0.5 flex-none flex-col items-center gap-2 bg-neutral-border",
            { "h-2 w-0.5 flex-none": lastStep, hidden: firstStep }
          )}
        />
        <div
          className={SubframeCore.twClassNames(
            "flex h-7 w-7 flex-none items-center justify-center overflow-hidden rounded-full bg-neutral-100",
            { "bg-brand-100": variant === "active" || variant === "completed" }
          )}
        >
          {stepNumber ? (
            <span
              className={SubframeCore.twClassNames("text-center font-body-bold text-body-bold text-subtext-color", {
                "font-body-bold text-body-bold text-brand-700": variant === "active",
                hidden: variant === "completed",
              })}
            >
              {stepNumber}
            </span>
          ) : null}
          <SubframeCore.Icon
            className={SubframeCore.twClassNames("hidden font-heading-3 text-heading-3 text-default-font", {
              "inline-flex text-brand-700": variant === "completed",
            })}
            name="FeatherCheck"
          />
        </div>
        <div
          className={SubframeCore.twClassNames(
            "flex min-h-[8px] w-0.5 shrink-0 grow basis-0 flex-col items-center gap-2 bg-neutral-border",
            { hidden: lastStep }
          )}
        />
      </div>
      <div
        className={SubframeCore.twClassNames("flex shrink-0 grow basis-0 flex-col items-center gap-1 py-4", {
          "px-0 pb-1 pt-4": lastStep,
          "px-0 pb-4 pt-1": firstStep,
        })}
      >
        {label ? (
          <span
            className={SubframeCore.twClassNames("line-clamp-2 w-full font-body text-body text-subtext-color", {
              "font-body-bold text-body-bold text-default-font": variant === "active",
              "font-body text-body text-default-font": variant === "completed",
            })}
          >
            {label}
          </span>
        ) : null}
        {children ? <div className="flex w-full flex-col items-start gap-2">{children}</div> : null}
      </div>
    </div>
  )
})

interface VerticalStepperRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

const VerticalStepperRoot = React.forwardRef<HTMLElement, VerticalStepperRootProps>(function VerticalStepperRoot(
  { children, className, ...otherProps }: VerticalStepperRootProps,
  ref
) {
  return children ? (
    <div className={SubframeCore.twClassNames("flex flex-col items-start", className)} ref={ref as any} {...otherProps}>
      {children}
    </div>
  ) : null
})

export const VerticalStepper = Object.assign(VerticalStepperRoot, {
  Step,
})
