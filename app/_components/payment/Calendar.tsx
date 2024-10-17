'use client';

import { useEffect, useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  ); // Store current year

  const todayDate = new Date();
  const currentMonthToday = todayDate.getMonth();
  const currentYearToday = todayDate.getFullYear();

  const endDate = new Date();
  endDate.setDate(todayDate.getDate() + 30);

  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();

  useEffect(() => {
    const today = new Date().getDate();
    setSelectedDate(today);
  }, []);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateSelectable = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    const thirtyDaysFromToday = new Date();
    thirtyDaysFromToday.setDate(today.getDate() + 30);
    return date >= today && date <= thirtyDaysFromToday;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

    const previousMonthDays = getDaysInMonth(
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear
    );
    const today = todayDate.getDate();

    const daysFromPreviousMonth = Array.from(
      { length: firstDayOfMonth },
      (_, i) => previousMonthDays - firstDayOfMonth + i + 1
    );

    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );

    const daysFromNextMonth = Array.from(
      {
        length:
          (7 - ((daysFromPreviousMonth.length + currentMonthDays.length) % 7)) %
          7,
      },
      (_, i) => i + 1
    );

    return (
      <div className='grid grid-cols-7 gap-4 mt-4 text-center'>
        {[
          'Chủ Nhật',
          'Thứ Hai',
          'Thứ Ba',
          'Thứ Tư',
          'Thứ Năm',
          'Thứ Sáu',
          'Thứ Bảy',
        ].map((day) => (
          <div key={day} className='font-bold'>
            {day}
          </div>
        ))}

        {/* Render days from the previous month (grayed out) */}
        {daysFromPreviousMonth.map((day) => (
          <div key={`prev-${day}`} className='p-2 rounded-full text-gray-400'>
            {day}
          </div>
        ))}

        {/* Render days from the current month */}
        {currentMonthDays.map((day) => {
          const isSelectable = isDateSelectable(day, currentMonth, currentYear);

          return (
            <div
              key={day}
              className={`p-2 rounded-full ${
                selectedDate === day &&
                currentMonth === currentMonthToday &&
                currentYear === currentYearToday
                  ? 'bg-red-500 text-white'
                  : isSelectable
                  ? 'hover:bg-gray-200 cursor-pointer'
                  : 'text-gray-400'
              }`}
              onClick={() => isSelectable && setSelectedDate(day)}
            >
              {day}
            </div>
          );
        })}

        {/* Render days from the next month (grayed out) */}
        {daysFromNextMonth.map((day) => {
          const isSelectable = isDateSelectable(
            day,
            currentMonth + 1,
            currentYear
          );

          return (
            <div
              key={`next-${day}`}
              className={`p-2 rounded-full ${
                selectedDate === day &&
                currentMonth === currentMonthToday &&
                currentYear === currentYearToday
                  ? 'bg-red-500 text-white'
                  : isSelectable
                  ? 'hover:bg-gray-200 cursor-pointer'
                  : 'text-gray-400'
              }`}
              onClick={() => isSelectable && setSelectedDate(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
      {/* Month and Year Navigation */}
      <div className='flex justify-between items-center mb-4'>
        <button
          className='btn btn-sm'
          onClick={handlePreviousMonth}
          disabled={
            currentMonth === currentMonthToday &&
            currentYear === currentYearToday
          }
        >
          ← Tháng trước
        </button>
        <h2 className='text-lg font-bold'>
          {String(currentMonth + 1).padStart(2, '0')}/{currentYear}{' '}
          {/* Display as mm/yyyy */}
        </h2>
        <button
          className='btn btn-sm'
          onClick={handleNextMonth}
          disabled={
            currentYear > endYear ||
            (currentYear === endYear && currentMonth >= endMonth)
          }
        >
          Tháng sau →
        </button>
      </div>
      <div className='calendar-container'>{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
