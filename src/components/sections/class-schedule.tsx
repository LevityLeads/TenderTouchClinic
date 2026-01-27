import { upcomingClasses, type ClassDate } from "@/data/schedule";
import { Button } from "@/components/ui/button";

/**
 * Get badge styling based on class availability status.
 */
function getStatusBadge(status: ClassDate["status"]) {
  const baseStyles = "text-xs font-medium px-2.5 py-0.5 rounded-full";

  switch (status) {
    case "available":
      return {
        className: `${baseStyles} bg-green-100 text-green-800`,
        label: "Spots Available",
      };
    case "few-spots":
      return {
        className: `${baseStyles} bg-yellow-100 text-yellow-800`,
        label: "Few Spots Left",
      };
    case "full":
      return {
        className: `${baseStyles} bg-neutral-100 text-neutral-600`,
        label: "Full",
      };
    case "waitlist":
      return {
        className: `${baseStyles} bg-primary-100 text-primary-800`,
        label: "Join Waitlist",
      };
  }
}

/**
 * Format ISO date string to readable format.
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-ZA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface ClassScheduleProps {
  /**
   * Filter by service type (e.g., "antenatal-classes", "baby-massage").
   * If not provided, shows all classes.
   */
  serviceFilter?: string;
}

/**
 * Display upcoming class dates with availability status and booking CTAs.
 * Server Component - filters out past dates and sorts by start date.
 * Requirements: SCHED-01 through SCHED-05
 */
export function ClassSchedule({ serviceFilter }: ClassScheduleProps) {
  const now = new Date();

  // Filter out past dates and optionally by service type
  const filteredClasses = upcomingClasses
    .filter((classDate) => new Date(classDate.startDate) >= now)
    .filter((classDate) => !serviceFilter || classDate.serviceId === serviceFilter)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  if (filteredClasses.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center">
        <p className="text-neutral-600">
          No upcoming classes scheduled. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredClasses.map((classDate) => {
        const badge = getStatusBadge(classDate.status);
        const isBookable = classDate.status !== "full";
        const buttonLabel =
          classDate.status === "waitlist" ? "Join Waitlist" : "Book Now";

        return (
          <article
            key={classDate.id}
            className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-neutral-900">
                {classDate.serviceName}
              </h3>
              <span className={badge.className}>{badge.label}</span>
            </div>

            <dl className="mt-4 space-y-2 text-sm text-neutral-600">
              <div className="flex justify-between">
                <dt className="font-medium">Starts</dt>
                <dd>{formatDate(classDate.startDate)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Time</dt>
                <dd>{classDate.time}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Duration</dt>
                <dd>{classDate.duration}</dd>
              </div>
              {classDate.status !== "full" && (
                <div className="flex justify-between">
                  <dt className="font-medium">Spots</dt>
                  <dd>
                    {classDate.spotsAvailable} of {classDate.spotsTotal}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-6">
              <Button
                href="/contact"
                variant={isBookable ? "primary" : "secondary"}
                size="sm"
                className="w-full"
                aria-disabled={!isBookable}
              >
                {isBookable ? buttonLabel : "Full"}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
