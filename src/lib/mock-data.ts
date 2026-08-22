// ─────────────────────────────────────────────────────────────
// DayFlow Mock Data
// Replace this file's exports with real API calls when the
// backend is connected. Keep the same types/shapes.
// ─────────────────────────────────────────────────────────────

export type EmployeeStatus = "present" | "absent" | "leave";

export type Employee = {
  id: string;          // e.g. "DF20220001"
  name: string;
  role: string;
  department: string;
  initials: string;
  status: EmployeeStatus;
  email: string;
  location: string;
};

// The currently logged-in employee's ID.
// Replace with a real session/cookie value when auth is wired up.
export const CURRENT_USER_ID = "DF20220001";

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "DF20220001",
    name: "Alice Johnson",
    role: "Software Engineer",
    department: "Engineering",
    initials: "AJ",
    status: "present",
    email: "alice@dayflow.com",
    location: "Bengaluru",
  },
  {
    id: "DF20220002",
    name: "Bob Smith",
    role: "Product Manager",
    department: "Product",
    initials: "BS",
    status: "absent",
    email: "bob@dayflow.com",
    location: "Mumbai",
  },
  {
    id: "DF20220003",
    name: "Charlie Davis",
    role: "UX Designer",
    department: "Design",
    initials: "CD",
    status: "leave",
    email: "charlie@dayflow.com",
    location: "Pune",
  },
  {
    id: "DF20220004",
    name: "Diana Prince",
    role: "HR Manager",
    department: "Human Resources",
    initials: "DP",
    status: "present",
    email: "diana@dayflow.com",
    location: "Bengaluru",
  },
  {
    id: "DF20220005",
    name: "Evan Wright",
    role: "DevOps Engineer",
    department: "Engineering",
    initials: "EW",
    status: "present",
    email: "evan@dayflow.com",
    location: "Hyderabad",
  },
  {
    id: "DF20220006",
    name: "Fiona Gallagher",
    role: "Marketing Lead",
    department: "Marketing",
    initials: "FG",
    status: "leave",
    email: "fiona@dayflow.com",
    location: "Chennai",
  },
  {
    id: "DF20220007",
    name: "George Kumar",
    role: "Backend Engineer",
    department: "Engineering",
    initials: "GK",
    status: "present",
    email: "george@dayflow.com",
    location: "Bengaluru",
  },
  {
    id: "DF20220008",
    name: "Hannah Nair",
    role: "Data Analyst",
    department: "Analytics",
    initials: "HN",
    status: "absent",
    email: "hannah@dayflow.com",
    location: "Bengaluru",
  },
  {
    id: "DF20220009",
    name: "Ivan Patel",
    role: "QA Engineer",
    department: "Engineering",
    initials: "IP",
    status: "present",
    email: "ivan@dayflow.com",
    location: "Pune",
  },
  {
    id: "DF20220010",
    name: "Jaya Sharma",
    role: "Finance Analyst",
    department: "Finance",
    initials: "JS",
    status: "present",
    email: "jaya@dayflow.com",
    location: "Delhi",
  },
  {
    id: "DF20220011",
    name: "Kiran Mehta",
    role: "Sales Executive",
    department: "Sales",
    initials: "KM",
    status: "leave",
    email: "kiran@dayflow.com",
    location: "Mumbai",
  },
  {
    id: "DF20220012",
    name: "Layla Reddy",
    role: "Legal Counsel",
    department: "Legal",
    initials: "LR",
    status: "present",
    email: "layla@dayflow.com",
    location: "Hyderabad",
  },
];
