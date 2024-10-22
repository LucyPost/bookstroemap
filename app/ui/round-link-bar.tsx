
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import clsx from 'clsx';

export default function RoundLinkBar() {
    
    const links = [
        { name: '路线1', href: '/route1'},
        { name: '路线2', href: '/route2' },
      ];

    return (
        <div className="relative flex inset-0">

        {/* 按钮 */}
        <div className="relative flex h-10 justify-around">
            {links.map((link, index) => (
            <RoundLinkBarButton
                key={index}
                link={link}
            />
            ))}
        </div>
        </div>
    );
}

function RoundLinkBarButton({ link }) {

    const pathname = usePathname();

    return (
        <Link href={link.href} className={clsx("flex items-center justify-center w-10 h-10 border border-black rounded-full bg-transparent text-black hover:bg-black hover:text-white transition",
            {
                'bg-teal-300': pathname == link.href && pathname == "/route1",
                'bg-purple-500': pathname == link.href && pathname == "/route2",
            })}>
            <p className="text-xs">{link.name}</p>
        </Link>
    );
}