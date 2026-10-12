import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-bold tracking-wide whitespace-nowrap transition-all duration-200 outline-none select-none border-2 border-[#1E293B] cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-['Outfit'] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1E293B]",
  {
    variants: {
      variant: {
        default:
          'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1E293B] hover:bg-[#7C3AED]',
        candy:
          'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1E293B]',
        secondary:
          'bg-white text-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:bg-[#FBBF24] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1E293B]',
        pink:
          'bg-[#F472B6] text-white shadow-[4px_4px_0px_0px_#1E293B] hover:bg-[#EC4899] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1E293B]',
        yellow:
          'bg-[#FBBF24] text-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:bg-[#F59E0B] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1E293B]',
        mint:
          'bg-[#34D399] text-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:bg-[#10B981] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1E293B]',
        outline:
          'bg-white text-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:bg-slate-100 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#1E293B]',
        ghost:
          'border-transparent shadow-none hover:bg-slate-100 hover:border-[#1E293B] text-[#1E293B] active:shadow-none',
        link: 'border-transparent shadow-none text-[#8B5CF6] underline-offset-4 hover:underline active:shadow-none',
      },
      size: {
        default: 'h-11 px-6 rounded-full text-sm gap-2',
        sm: 'h-9 px-4 rounded-full text-xs gap-1.5',
        lg: 'h-13 px-8 rounded-full text-base gap-2.5',
        icon: 'size-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
