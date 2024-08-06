// /src/components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// Base styles for card component
const cardBaseClasses = "rounded-lg border shadow-md transition-transform duration-300 ease-in-out";

// Funky gradient styles for light mode
const lightModeGradient = "bg-gradient-to-r from-pink-400 via-yellow-300 to-teal-400 text-black border-gray-200 hover:shadow-lg";

// Funky gradient styles for dark mode
const darkModeGradient = "bg-gradient-to-r from-purple-600 via-blue-800 to-indigo-700 text-white border-gray-700 hover:shadow-lg";

// Animation for card hover effect
const hoverAnimation = "transition-transform transform hover:scale-105 hover:rotate-1";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Determine if dark mode is enabled
  const isDarkMode = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div
      ref={ref}
      className={cn(
        cardBaseClasses,
        isDarkMode ? darkModeGradient : lightModeGradient,
        hoverAnimation,
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
