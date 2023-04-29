'use client';

import {Inter} from 'next/font/google';
import React from 'react';
import CalendarProvider from '@/app/providers/Calendar.provider';
import CalendarHeader from '@/app/components/CalendarHeader';
import CalendarNavigationDay from '@/app/components/CalendarNavigationDay';
import * as classNames from 'classnames';
import {ClockIcon} from '@heroicons/react/20/solid';
import CalendarDayList from '@/app/components/CalendarDayList';

const inter = Inter({subsets: ['latin']});

const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
 
export default function Home() {
    return (
        <CalendarProvider>
            <div className="lg:flex lg:h-full lg:flex-col">
                <CalendarHeader/>
                <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                    <div
                        className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                        {DAY_LETTERS.map((letter) => <CalendarNavigationDay key={letter} dayLetter={letter}/>)}
                    </div>
                    <div className="flex bg-gray-200 text-xs leading-1 text-gray-700 lg:flex-auto">
                        <CalendarDayList/>
                    </div>
                </div>
            </div>
        </CalendarProvider>
    );
}
