import { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { 
  Squares2X2Icon, 
  ArchiveBoxIcon, 
  PresentationChartLineIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Squares2X2Icon },
  { name: 'Products', href: '/products', icon: ArchiveBoxIcon },
  { name: 'Analytics', href: '/analytics', icon: PresentationChartLineIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // The key change is here: `min-h-screen` ensures this container is at least as tall as the viewport.
    <div className="min-h-screen bg-slate-50">
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <h1 className="text-xl font-bold text-slate-900">Fi Money</h1>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? 'border-teal-500 text-slate-900'
                            : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                        )}
                        aria-current={location.pathname === item.href ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  >
                     <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                     <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800',
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                    )}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                   <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-2 rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                  >
                     <ArrowLeftOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                     <span className="text-base font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

export default Layout;
