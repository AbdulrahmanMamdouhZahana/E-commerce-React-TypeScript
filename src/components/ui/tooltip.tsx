import { Tooltip as ChakraTooltip, type TooltipProps as ChakraTooltipProps } from "@chakra-ui/react"
import * as React from "react"

export interface TooltipProps extends Omit<ChakraTooltipProps, "children" | "content"> {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  content: React.ReactNode
  disabled?: boolean
  children: React.ReactNode
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      portalRef,
      ...rest
    } = props

    if (disabled) return <>{children}</>

    return (
      <ChakraTooltip
        ref={ref}
        label={content}
        hasArrow={showArrow}
        isDisabled={disabled}
        portalProps={portalled && portalRef ? { containerRef: portalRef } : undefined}
        {...rest}
      >
        {children}
      </ChakraTooltip>
    )
  },
)

