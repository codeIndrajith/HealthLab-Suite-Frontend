import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      className="flex items-center text-sm text-gray-600"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-blue-600 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <BiChevronRight className="mx-2 w-4 h-4 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
