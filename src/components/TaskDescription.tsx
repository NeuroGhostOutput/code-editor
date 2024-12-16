const TaskDescription = () => {
    return (
        <div className="w-full p-6 border border-gray-300 rounded-lg bg-slate-600">
            <h2 className="text-2xl font-bold mb-4">Задача</h2>
            <div className="prose prose-sm max-w-none">
                <p>
                    Напишите программу на выбранном языке программирования (Python или Go).
                    Вы можете использовать редактор кода ниже для написания и тестирования вашего решения.
                </p>
                <h3 className="text-lg font-semibold mt-4 mb-2">Примеры кода:</h3>
                <div className="bg-gray-800 p-4 rounded-md">
                    <p className="font-medium mb-2">Python:</p>
                    <pre className="bg-gray-800 text-white p-2 rounded">
                        {`print("Hello, World!")`}
                    </pre>
                    <p className="font-medium mb-2 mt-4">Go:</p>
                    <pre className="bg-gray-800 text-white p-2 rounded">
                        {`package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default TaskDescription;
