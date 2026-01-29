"use client";

import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { upcomingClasses, type ClassDate } from "@/data/schedule";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";

/**
 * Format date for display (e.g., "Sat, 15 Feb")
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/**
 * Get status badge styling
 */
function getStatusBadge(status: ClassDate["status"]) {
  switch (status) {
    case "few-spots":
      return {
        text: "Few spots left",
        className: "bg-amber-100 text-amber-800",
      };
    case "full":
      return {
        text: "Full",
        className: "bg-neutral-100 text-neutral-500",
      };
    case "waitlist":
      return {
        text: "Waitlist",
        className: "bg-neutral-100 text-neutral-600",
      };
    default:
      return {
        text: "Available",
        className: "bg-primary-100 text-primary-700",
      };
  }
}

interface ClassCardProps {
  classData: ClassDate;
}

function ClassCard({ classData }: ClassCardProps) {
  const badge = getStatusBadge(classData.status);
  const isBookable = classData.status !== "full";

  return (
    <div
      className={`
        relative bg-white rounded-xl border border-neutral-200 p-5
        transition-all duration-300
        hover:shadow-lg hover:border-primary-200 hover:-translate-y-1
        ${!isBookable ? "opacity-60" : ""}
      `}
    >
      {/* Status badge */}
      <span
        className={`
          absolute top-4 right-4
          px-2.5 py-1 rounded-full text-xs font-medium
          ${badge.className}
        `}
      >
        {badge.text}
      </span>

      {/* Service name */}
      <h3 className="font-semibold text-lg text-neutral-900 pr-24">
        {classData.serviceName}
      </h3>

      {/* Details */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Calendar className="w-4 h-4 text-primary-500" aria-hidden="true" />
          <span>Starts {formatDate(classData.startDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Clock className="w-4 h-4 text-primary-500" aria-hidden="true" />
          <span>{classData.time} &middot; {classData.duration}</span>
        </div>

        {isBookable && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Users className="w-4 h-4 text-primary-500" aria-hidden="true" />
            <span>{classData.spotsAvailable} spots available</span>
          </div>
        )}
      </div>

      {/* Book button */}
      {isBookable && (
        <Link
          href="/book"
          className="
            mt-4 w-full inline-flex items-center justify-center gap-2
            bg-primary-50 text-primary-700
            py-2.5 px-4 rounded-lg
            font-medium text-sm
            transition-all duration-200
            hover:bg-primary-100
            active:scale-[0.98]
          "
        >
          Book Now
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

/**
 * Upcoming classes section for homepage.
 * Shows next 3 available classes with booking CTAs.
 */
export function UpcomingClasses() {
  // Get next 3 classes that aren't full
  const availableClasses = upcomingClasses
    .filter((c) => c.status !== "full")
    .slice(0, 3);

  // If all classes are full, show the next 3 anyway
  const classesToShow =
    availableClasses.length > 0
      ? availableClasses
      : upcomingClasses.slice(0, 3);

  // Count classes with few spots
  const urgentClasses = upcomingClasses.filter(c => c.status === "few-spots").length;

  return (
    <Container>
      <FadeIn>
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
            Upcoming Classes
          </h2>
          <p className="mt-3 text-lg text-neutral-600 max-w-2xl mx-auto">
            Secure your spot in our intimate, small-group sessions
          </p>
          {/* Urgency indicator */}
          {urgentClasses > 0 && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {urgentClasses} {urgentClasses === 1 ? 'class' : 'classes'} filling up fast
            </p>
          )}
        </div>
      </FadeIn>

      <FadeInStagger className="grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
        {classesToShow.map((classData) => (
          <FadeInStaggerItem key={classData.id}>
            <ClassCard classData={classData} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>

      <FadeIn delay={0.4}>
        <div className="mt-10 text-center">
          <Button href="/schedule" variant="outline">
            View Full Schedule
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </FadeIn>
    </Container>
  );
}
