import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {CakeIcon} from '@heroicons/react/24/outline';
import useCalendarActions from '@/app/hooks/useCalendarActions';

function AddEventModal({showMenu, toggle}: Props) {
    const [heading, setHeading] = React.useState('');
    const [from, setFrom] = React.useState<string>('');
    const [to, setTo] = React.useState<string>('');
    const {createEvent} = useCalendarActions();

    const submit = () => {
        if (!heading || !from || !to) return;
        createEvent({
            heading,
            from: new Date(from).getTime(),
            to: new Date(to).getTime(),
        });

        toggle();
    };

    const cancelButtonRef = React.useRef(null);
    return (
        <Transition.Root show={showMenu} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={toggle}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <CakeIcon className="h-6 w-6 text-blue-600" aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-base font-semibold leading-6 text-gray-900">
                                                Add event
                                            </Dialog.Title>
                                            <div className="mt-2 space-y-5">
                                                <div>
                                                    <label htmlFor="heading"
                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                        Heading
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="heading"
                                                            value={heading}
                                                            onChange={(event) => setHeading(event.target.value)}
                                                            id="heading"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                    <div>
                                                        <label htmlFor="from"
                                                               className="block uppercase text-sm font-medium leading-3 text-gray-900">
                                                            From
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="datetime-local"
                                                                name="from"
                                                                onChange={(event) => setFrom(event.target.value)}
                                                                id="from"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="to"
                                                               className="block uppercase text-sm font-medium leading-3 text-gray-900">
                                                            To
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="datetime-local"
                                                                name="to"
                                                                onChange={(event) => setTo(event.target.value)}
                                                                id="to"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={submit}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={toggle}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

type Props = Readonly<{
    showMenu: boolean;
    toggle: () => void;
}>;

export default AddEventModal;

