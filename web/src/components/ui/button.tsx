import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Adjust path according to your project structure

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-neon-green to-dark-green text-black hover:from-neon-green/90 hover:to-dark-green/90 active:transform active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 active:transform active:scale-95",
        outline:
          "border border-neon-green bg-transparent text-neon-green hover:bg-gradient-to-r hover:from-neon-green/10 hover:to-black active:transform active:scale-95",
        secondary:
          "bg-gradient-to-r from-dark-green to-black text-white hover:from-dark-green/80 hover:to-black/80 active:transform active:scale-95",
        ghost:
          "bg-transparent text-neon-green border border-neon-green hover:bg-neon-green/20 active:transform active:scale-95",
        link:
          "text-neon-green underline-offset-4 hover:underline active:text-neon-green/70",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        <style>{`
          @keyframes clickEffect {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            }
            50% {
              transform: scale(0.95);
              box-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            }
          }
          .active\:animate-clickEffect:active {
            animation: clickEffect 0.2s ease-out;
          }
        `}</style>
        <Comp
          className={cn(buttonVariants({ variant, size, className }), "active:animate-clickEffect", "text-lg font-semibold")}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
