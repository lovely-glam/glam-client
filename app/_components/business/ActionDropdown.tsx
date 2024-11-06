import { useState } from "react";
import { createPortal } from "react-dom";
import { IconType } from "react-icons";
import { FaEllipsisV, FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface IActionDropdown {
    title: string;
    icon: IconType;
    action: () => void;
}

const ActionDropdown: React.FC<{ buttons: IActionDropdown[] }> = ({ buttons }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { top, left, height } = event.currentTarget.getBoundingClientRect();
        setPosition({ top: top + height + window.scrollY, left: left + window.scrollX });
        setIsOpen(!isOpen);
    };
    const closeDropdown = () => setIsOpen(false);
    return (
        <>
            <button
                onClick={handleToggle}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
                <FaEllipsisV className="w-5 h-5" />
            </button>
            {isOpen && createPortal(
                <div
                    className="fixed bg-white border rounded shadow-lg py-1 z-50"
                    style={{ top: `${position.top}px`, left: `${position.left}px` }}
                >
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                button.action();
                                closeDropdown();
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            <button.icon className="mr-2" />
                            {button.title}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </>
    );
};

export default ActionDropdown;