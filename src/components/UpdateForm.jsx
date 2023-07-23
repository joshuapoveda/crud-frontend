import noteStore from "../stores/notesStore";

const UpdateForm = () => {
  const store = noteStore();
  if (!store.updateFormFields._id) return <></>;
  return (
    <div>
      <div>
        <h2>Update Note</h2>
        <form onSubmit={store.updateNote}>
          <input
            onChange={store.updateUpdateFormInput}
            value={store.updateFormFields.title}
            name="title"
          ></input>
          <textarea
            onChange={store.updateUpdateFormInput}
            value={store.updateFormFields.body}
            name="body"
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Submit Edit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
