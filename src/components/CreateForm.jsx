import noteStore from "../stores/notesStore";

const CreateForm = () => {
  const store = noteStore();

  if (store.updateFormFields._id) {
    <></>;
  }

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={store.createNote}>
        <input
          required
          onChange={store.updateCreateFormInput}
          value={store.createFormFields.title}
          name="title"
        ></input>
        <textarea
          required
          onChange={store.updateCreateFormInput}
          value={store.createFormFields.body}
          name="body"
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};
export default CreateForm;
