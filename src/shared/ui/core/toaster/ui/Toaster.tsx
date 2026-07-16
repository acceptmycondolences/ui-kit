import type { CSSProperties } from 'react'

import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconInfoCircleFilled,
  IconLoader,
  IconX,
} from '@tabler/icons-react'
import { Toaster as ToasterPrimitive } from 'sonner'

import { classNames } from '~/shared/lib'

const TOASTER_STYLE = {
  '--width': '16.25rem',
} as CSSProperties

export function Toaster() {
  return (
    <ToasterPrimitive
      expand
      icons={{
        close: <IconX />,
        error: <IconCircleXFilled />,
        info: <IconInfoCircleFilled />,
        loading: <IconLoader />,
        success: <IconCircleCheckFilled />,
        warning: <IconAlertTriangleFilled />,
      }}
      position="top-center"
      style={TOASTER_STYLE}
      toastOptions={{
        classNames: {
          closeButton: classNames(
            'absolute top-1/2 right-3 inline-flex shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center',
            'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40',
            '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:!text-muted-foreground [&_svg]:transition-colors',
            'hover:[&_svg]:!text-primary',
          ),
          default:
            'flex w-full gap-2 rounded-xl border bg-popover px-3 py-2.5 font-sans text-popover-foreground shadow-toaster',
          description: 'mt-0.5 text-xs',
          error: '[&_svg]:text-destructive-foreground',
          icon: classNames('self-center', '[&_svg]:pointer-events-none [&_svg]:shrink-0'),
          info: '[&_svg]:text-informative',
          loader: classNames(
            'data-[visible=false]:hidden data-[visible=true]:!static data-[visible=true]:!transform-none',
            'data-[visible=true]:[&_svg]:animate-spin',
          ),
          success: '[&_svg]:text-constructive',
          title: 'font-medium',
          warning: '[&_svg]:text-warning',
        },
        unstyled: true,
      }}
    />
  )
}
