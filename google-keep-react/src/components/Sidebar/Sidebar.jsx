import "./Sidebar.css";

const Sidebar = (props) => {
  const { isSidebarOpen } = props;

  return (
    <div className={isSidebarOpen ? "sidebar" : "sidebar sidebar-active"}>
      <div
        className={
          isSidebarOpen
            ? "sidebar-item active-item"
            : "sidebar-item sidebar-active-item"
        }
      >
        <span className="material-symbols-outlined active">lightbulb</span>
        <span className="sidebar-text">Notes</span>
      </div>
      <div className="sidebar-item hover">
        <span className="material-symbols-outlined"> notifications </span>
        <span className="sidebar-text">Reminders</span>
      </div>
      <div className="sidebar-item hover">
        <span className="material-symbols-outlined "> edit </span>
        <span className="sidebar-text">Edit Labels</span>
      </div>
      <div className="sidebar-item">
        <span className="material-symbols-outlined hover"> archive </span>
        <span className="sidebar-text">Archive</span>
      </div>
      <div className="sidebar-item">
        <span className="material-symbols-outlined hover"> delete </span>
        <span className="sidebar-text">Trash</span>
      </div>
    </div>
  );
};

export default Sidebar;

// {
//   isSidebarOpen ? "sidebar-item" : "sidebar-item sidebar-active-item";
// }
