import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[24px] text-lg font-heading font-bold transition-all disabled:pointer-events-none disabled:opacity-50 active:scale-95 active:translate-y-[6px]",
  {
    variants: {
      variant: {
        primary: "bg-primary-purple text-white hover:bg-[#7C3AED] shadow-[0_6px_0_0_#5B21B6] active:shadow-[0_0px_0_0_#5B21B6]",
        secondary: "bg-secondary-sky text-white hover:bg-[#0284C7] shadow-[0_6px_0_0_#0284C7] active:shadow-[0_0px_0_0_#0284C7]",
        accent: "bg-accent-yellow text-white hover:bg-[#D97706] shadow-[0_6px_0_0_#B45309] active:shadow-[0_0px_0_0_#B45309]",
        ghost: "hover:bg-slate-100 text-text-primary active:translate-y-0 active:scale-95 shadow-none",
        outline: "border-4 border-primary-purple text-primary-purple hover:bg-slate-50 active:translate-y-0 shadow-none",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 px-6 text-base rounded-[16px]",
        lg: "h-16 px-10 text-xl rounded-[32px]",
        icon: "h-16 w-16 rounded-[24px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
