function AccountSettings() {
  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  return (
    <div className="p-4 min-w-48 bg-white rounded-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Account Settings
      </h3>

      <div className="space-y-2">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
