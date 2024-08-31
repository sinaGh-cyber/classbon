import { NavigationMenuItem } from "@/types/navigation-menu-item";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const TopNavigation: React.FC = () => {
  const menuItems: NavigationMenuItem[] = [
    { title: "صفحه اصلی", href: "/" },
    { title: "دوره‌های ری‌اکت و نکست", href: "/courses" },
    { title: "مطالب و مقالات", href: "/blog" },
  ];

  const pathname = usePathname();
  return (
    <ul className="flex gap-x-8 mr-12" >
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={`navigation-${item.href}`} className={`hover:text-primary transition-colors pb-2 ${isActive && 'border-b-2 dark:text-primary dark:border-primary/30'}`} >
            <Link href={item.href}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};
