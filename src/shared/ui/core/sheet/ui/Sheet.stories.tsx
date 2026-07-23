import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import {
  Button,
  Progress,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '~/shared/ui/core'

const meta = {
  component: Sheet,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  title: 'Components/Sheet',
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const trigger = canvas.getByRole('button', { name: 'Trigger' })

    await userEvent.click(trigger)
    await expect(body.getByRole('dialog', { name: 'Title' })).toBeInTheDocument()

    await userEvent.click(body.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()

    await userEvent.click(trigger)
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
  render: () => (
    <Sheet>
      <SheetTrigger className="rounded-none">Trigger</SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
          <div className="py-2 md:py-6">Content</div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  ),
}

const STEPS = ['Content 1', 'Content 2'] as const

export const WithBack: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const trigger = canvas.getByRole('button', { name: 'Trigger' })

    await userEvent.click(trigger)
    await expect(body.getByRole('dialog', { name: 'Step 1' })).toBeInTheDocument()

    const nextButton = body.getByRole('button', { name: 'Next' })
    const previousButton = body.getByRole('button', { name: 'Previous' })
    const progress = body.getByRole('progressbar')
    const backButton = body.getByRole('button', { name: 'Back' })

    await expect(previousButton).toBeDisabled()
    await expect(nextButton).toBeEnabled()
    await expect(progress).toHaveAttribute('aria-valuenow', '50')

    await userEvent.click(nextButton)
    await expect(body.getByRole('dialog', { name: 'Step 2' })).toBeInTheDocument()
    await expect(previousButton).toBeEnabled()
    await expect(nextButton).toBeDisabled()
    await expect(progress).toHaveAttribute('aria-valuenow', '100')

    await userEvent.click(backButton)
    await expect(body.getByRole('dialog', { name: 'Step 1' })).toBeInTheDocument()
    await expect(previousButton).toBeDisabled()
    await expect(nextButton).toBeEnabled()
    await expect(progress).toHaveAttribute('aria-valuenow', '50')

    await userEvent.click(nextButton)
    await expect(body.getByRole('dialog', { name: 'Step 2' })).toBeInTheDocument()

    await userEvent.click(previousButton)
    await expect(body.getByRole('dialog', { name: 'Step 1' })).toBeInTheDocument()
    await expect(previousButton).toBeDisabled()
    await expect(nextButton).toBeEnabled()
    await expect(progress).toHaveAttribute('aria-valuenow', '50')

    await userEvent.click(backButton)
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
  render: function WithBackRender() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)

    const lastStep = STEPS.length - 1

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen)

      if (!newOpen) {
        setStep(0)
      }
    }

    const handleBack = () => {
      if (step === 0) {
        setOpen(false)

        return
      }

      setStep((currentStep) => currentStep - 1)
    }

    const handleNext = () => {
      setStep((currentStep) => Math.min(currentStep + 1, lastStep))
    }

    const progress = ((step + 1) / STEPS.length) * 100

    return (
      <Sheet onOpenChange={handleOpenChange} open={open}>
        <SheetTrigger className="rounded-none">Trigger</SheetTrigger>
        <SheetPortal>
          <SheetOverlay />
          <SheetContent>
            <SheetHeader backProps={{ onClick: handleBack }} containerClassName="md:border-b-0" isClose={false}>
              <SheetTitle>{`Step ${String(step + 1)}`}</SheetTitle>
              <SheetDescription>Description</SheetDescription>
            </SheetHeader>
            <Progress value={progress} />
            <div className="flex flex-1 flex-col justify-between pt-2 md:pt-6">
              <div>{STEPS[step]}</div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button disabled={step === 0} onClick={handleBack} size="large" variant="outline">
                  Previous
                </Button>
                <Button disabled={step === lastStep} onClick={handleNext} size="large" variant="constructive">
                  Next
                </Button>
              </div>
            </div>
          </SheetContent>
        </SheetPortal>
      </Sheet>
    )
  },
}
