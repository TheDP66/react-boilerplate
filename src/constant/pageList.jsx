import {
  BarChartOutlined,
  CheckSquareOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Dashboard from "../pages/dashboard/Dashboard";
import DetailDashboard from "../pages/dashboard/DetailDashboard";
import Login from "../pages/login/Login";
import Users from "../pages/users/Users";
import { generateAuthPage, generateAuthParentPage } from "../utils/pages";

export const unauthenticatedPageList = [
  {
    path: "login",
    element: <Login />,
    key: "Login",
  },
  {
    path: "signup",
    element: <>Sign Up</>,
    key: "Signup",
  },
  {
    path: "forgot_password",
    element: <>Forgot Password</>,
    key: "forgot_password",
  },
];

// ? Documentation in src/utils/pages.js
export const authenticatedPageList = () =>
  [
    generateAuthPage({
      element: <Dashboard />,
      icon: <HomeOutlined />,
      key: "dashboard",
      label: "Dashboard",
      description:
        "Provides administrators direct access to important Encompass tools.",
    }),
    generateAuthPage({
      element: <>Activity</>,
      icon: <BarChartOutlined />,
      key: "activity",
      label: "Activity",
      description: "Provides activity information.",
    }),
    generateAuthPage({
      element: <>Task</>,
      icon: <CheckSquareOutlined />,
      key: "task",
      label: "Task",
      description: "Provides task information.",
    }),
    generateAuthPage({
      element: <Users />,
      icon: <TeamOutlined />,
      key: "users",
      label: "Users",
      description: "Provides user information and activity log.",
    }),
    {
      type: "divider",
      style: { margin: "10px 0" },
    },
    generateAuthPage({
      element: <>Setting</>,
      icon: <SettingOutlined />,
      key: "setting",
      label: "Setting",
      description: "Provides account profile and configuration.",
    }),
    // ? Use generateAuthParentPage() if menu has submenu
    generateAuthParentPage({
      key: "report",
      label: "Report",
      icon: <FileTextOutlined />,
      children: [
        generateAuthPage({
          element: <>Activity Report</>,
          key: "activity_report",
          label: "Activity",
          icon: <FileTextOutlined />,
          description: "Provides activity report.",
        }),
        generateAuthPage({
          element: <>Task Report</>,
          key: "task_report",
          label: "Task",
          icon: <FileTextOutlined />,
          description: "Provides task report.",
        }),
        generateAuthPage({
          element: <>Users Report</>,
          key: "users_report",
          label: "Users",
          icon: <FileTextOutlined />,
          description: "Provides users report.",
        }),
      ],
    }),
    generateAuthPage({
      element: <>Support</>,
      icon: <CustomerServiceOutlined />,
      key: "support",
      label: "Support",
      description:
        "Answer questions by customers and help them in using the product and get the most out of it.",
    }),
  ].filter((page) => !page.unauthorized || page?.children?.length < 0);

export const authenticatedDetailPageList = () => [
  generateAuthPage({
    element: <DetailDashboard />,
    key: "dashboard/:id",
  }),
];
