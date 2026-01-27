export interface ClassDate {
  id: string;
  serviceId: string;
  serviceName: string;
  startDate: string; // ISO date string
  time: string;
  duration: string;
  spotsTotal: number;
  spotsAvailable: number;
  status: "available" | "few-spots" | "full" | "waitlist";
}

export const upcomingClasses: ClassDate[] = [
  {
    id: "anc-2026-02",
    serviceId: "antenatal-classes",
    serviceName: "Antenatal Classes",
    startDate: "2026-02-15",
    time: "10:00 AM",
    duration: "6 weeks",
    spotsTotal: 7,
    spotsAvailable: 3,
    status: "few-spots",
  },
  {
    id: "bm-2026-02",
    serviceId: "baby-massage",
    serviceName: "Baby Massage",
    startDate: "2026-02-20",
    time: "2:00 PM",
    duration: "4 weeks",
    spotsTotal: 6,
    spotsAvailable: 4,
    status: "available",
  },
  {
    id: "anc-2026-03",
    serviceId: "antenatal-classes",
    serviceName: "Antenatal Classes",
    startDate: "2026-03-22",
    time: "10:00 AM",
    duration: "6 weeks",
    spotsTotal: 7,
    spotsAvailable: 6,
    status: "available",
  },
  {
    id: "bm-2026-03",
    serviceId: "baby-massage",
    serviceName: "Baby Massage",
    startDate: "2026-03-27",
    time: "2:00 PM",
    duration: "4 weeks",
    spotsTotal: 6,
    spotsAvailable: 0,
    status: "full",
  },
  {
    id: "anc-2026-04",
    serviceId: "antenatal-classes",
    serviceName: "Antenatal Classes",
    startDate: "2026-04-26",
    time: "10:00 AM",
    duration: "6 weeks",
    spotsTotal: 7,
    spotsAvailable: 7,
    status: "available",
  },
  {
    id: "bm-2026-04",
    serviceId: "baby-massage",
    serviceName: "Baby Massage",
    startDate: "2026-04-24",
    time: "2:00 PM",
    duration: "4 weeks",
    spotsTotal: 6,
    spotsAvailable: 1,
    status: "few-spots",
  },
];
