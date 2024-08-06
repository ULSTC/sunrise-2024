import React, { useEffect, useState } from 'react';
import Task from '@/model/Task';
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Button } from './ui/button';
import { IoMdCheckmark } from "react-icons/io";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentGroup, setCurrentGroup] = useState<number>(1); // Default to group 1

    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return res.json();
            })
            .then((data) => {
                setTasks(data);
                updateCurrentGroup(data);
            })
            .catch((error) => setError(error.message));
    }, []);

    const markAsCompleted = (taskId: number) => {
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to update task');
                }
                return res.json();
            })
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, completed: true } : task
                    )
                );
                updateCurrentGroup(tasks);
            })
            .catch((error) => setError(error.message));
    };

    const updateCurrentGroup = (tasks: Task[]) => {
        const completedGroups = new Set<number>();
        tasks.forEach(task => {
            if (task.completed) {
                completedGroups.add(task.group);
            }
        });

        let nextGroup = 1;
        while (completedGroups.has(nextGroup)) {
            nextGroup++;
        }

        setCurrentGroup(nextGroup);
    };

    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    const filteredTasks = tasks.filter(
        (task) => !task.completed && task.group === currentGroup
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-full flex justify-evenly mt-4 pb-[2rem]'>

            {/* Pending tasks */}
            <div className='w-[30%] px-4'>
                <h1 className='text-3xl font-extrabold flex items-center gap-4 mb-6 text-blue-600'>
                    To-Do
                    <span className='w-[40px] h-[40px] text-[18px] text-center bg-gray-300 rounded-full text-gray-600 flex items-center justify-center font-bold'>
                        {incompleteTasks.length}
                    </span>
                </h1>
                {incompleteTasks.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                        <ul className='flex flex-col flex-wrap gap-4'>
                            {incompleteTasks.map((task) => (
                                <li key={task.id}>
                                    <Card className='w-full border-4 border-neon-green bg-gray-100'>
                                        <div className='flex justify-between items-center border-b border-gray-700 py-2 px-4'>
                                            <div className='text-lg font-bold text-black'>Task {task.id}</div>
                                            <Button
                                                disabled={!task.completed}
                                                variant="ghost"
                                                className='text-white :bg-gray-300 border-gray-700 flex gap-2 items-center'
                                            >
                                                <IoMdCheckmark /> Start
                                            </Button>
                                        </div>
                                        <div className='flex flex-col gap-2 p-4'>
                                            <CardTitle className='text-lg font-semibold text-black'>{task.title}</CardTitle>
                                            <CardDescription className='text-sm font-normal text-black'>{task.description}</CardDescription>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>

            {/* In progress tasks */}
            <div className='w-[30%] px-4'>
                <h1 className='text-3xl font-extrabold flex items-center gap-4 mb-6 text-yellow-600'>
                    In Progress
                    <span className='w-[40px] h-[40px] text-[18px] text-center rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold'>
                        {filteredTasks.length}
                    </span>
                </h1>
                {filteredTasks.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                        <ul className='flex flex-col flex-wrap gap-4'>
                            {filteredTasks.map((task) => (
                                <li key={task.id}>
                                    <Card className='w-full border-4 border-neon-green bg-gray-100'>
                                        <div className='flex justify-between items-center border-b border-gray-700 py-2 px-4'>
                                            <div className='text-lg font-bold text-black'>Task {task.id}</div>
                                            <Button
                                                onClick={() => markAsCompleted(task.id)}
                                                variant="default"
                                                className='border text-white flex gap-2 items-center'
                                            >
                                                <IoMdCheckmark /> Done
                                            </Button>
                                        </div>
                                        <div className='flex flex-col gap-2 p-4'>
                                            <CardTitle className='text-lg font-semibold text-black'>{task.title}</CardTitle>
                                            <CardDescription className='text-sm font-normal text-black'>{task.description}</CardDescription>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>

            {/* Completed tasks */}
            <div className='w-[30%] px-4'>
                <h1 className='text-3xl font-extrabold flex items-center gap-4 mb-6 text-green-600'>
                    Completed Tasks
                    <span className='w-[40px] h-[40px] text-[18px] text-center rounded-full bg-green-500 text-white flex items-center justify-center font-bold'>
                        {completedTasks.length}
                    </span>
                </h1>
                {completedTasks.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                        <ul className='flex flex-col flex-wrap gap-4'>
                            {completedTasks.map((task) => (
                                <li key={task.id}>
                                    <Card className='w-full border-4 border-neon-green bg-gray-100'>
                                        <div className='flex justify-center items-center border-b border-gray-700 py-2 px-4'>
                                            <h2 className='text-lg text-center font-bold text-black'>Task {task.id}</h2>
                                        </div>
                                        <div className='flex flex-col gap-2 p-4'>
                                            <CardTitle className='text-lg font-semibold text-black'>{task.title}</CardTitle>
                                            <CardDescription className='text-sm font-normal text-black'>{task.description}</CardDescription>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default TaskList;
