const InputForm = ({ task, setTask, handleTaskSubmit }) => {
  return (
    <form className="relative">
      <input
        type="text"
        placeholder="Enter A Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full text-[28px] rounded-full py-3.5 pl-6 shadow-[inset_0_0_5px_#000] outline-none"
      />
      <button
        onClick={handleTaskSubmit}
        className="absolute right-3 top-2 bg-sky-600 hover:bg-sky-800 shadow-[0_0_10px_#000] rounded-full p-3.5 px-4 active:scale-75 transition-all text-white"
      >
        Go
      </button>
    </form>
  );
};

export default InputForm;
