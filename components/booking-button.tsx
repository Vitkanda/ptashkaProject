"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingForm } from "@/components/booking-form"
import type { ButtonProps } from "@/components/ui/button"

interface BookingButtonProps extends ButtonProps {
  salonId: string
  defaultServiceId?: string
  defaultSpecialistId?: string
}

export function BookingButton({
  salonId,
  defaultServiceId,
  defaultSpecialistId,
  children,
  ...props
}: BookingButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} {...props}>
        {children}
      </Button>
      <BookingForm
        open={open}
        onOpenChange={setOpen}
        salonId={salonId}
        defaultServiceId={defaultServiceId}
        defaultSpecialistId={defaultSpecialistId}
      />
    </>
  )
}
