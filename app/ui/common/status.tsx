// import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex rounded py-1 px-2',
        {
          'bg-[#3CA745] text-sm font-medium text-white hover:bg-opacity-90': status === 'active',
          'bg-[#DC3545] text-sm font-medium text-white hover:bg-opacity-90': status === 'inactive',
        },
      )}
    >
      {status === 'active' ? (
        <>
          Activo
          {/* <ClockIcon className="ml-1 w-4 text-gray-500" /> */}
        </>
      ) : null}
      {status === 'inactive' ? (
        <>
          Inactivo
          {/* <CheckIcon className="ml-1 w-4 text-white" /> */}
        </>
      ) : null}
    </span>
  );
}


{/* <button className="inline-flex rounded bg-[#DC3545] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
            Danger
          </button>
<button className="inline-flex rounded bg-[#3CA745] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
            Success
          </button> */}