import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<typeof Switch> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeVariants = {
  sm: "w-8 h-4 [&>span]:w-3 [&>span]:h-3 [&>span]:data-[state=checked]:translate-x-[20px]",
  md: "w-11 h-6 [&>span]:w-5 [&>span]:h-5 [&>span]:data-[state=checked]:translate-x-[21px]",
  lg: "w-14 h-8 [&>span]:w-6 [&>span]:h-6 [&>span]:data-[state=checked]:translate-x-[32px]",
};

export function CustomSwitch({ size = "md", className, ...props }: Props) {
  return (
    <Switch
      className={cn(sizeVariants[size], "cursor-pointer", className)}
      {...props}
    />
  );
}
