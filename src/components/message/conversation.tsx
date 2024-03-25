function Conversation({ username = "Tesing username" }: { username?: string }) {
  return (
    <div className="flex items-center justify-center w-full bg-blue-200 border-4 rounded">
      <button>
        <h1>{username}</h1>
      </button>
    </div>
  );
}

export default Conversation;
