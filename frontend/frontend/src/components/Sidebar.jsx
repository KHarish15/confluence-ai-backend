function Sidebar({

    history,

    onNewChat,

    onOpenChat

}) {

    return (

        <aside className="history-sidebar">

            <div className="history-panel">

                <button
                    className="new-chat-btn"
                    onClick={onNewChat}
                >
                    + New Chat
                </button>

                <h3 className="history-title">

                    Recent History

                </h3>

                <div className="history-list">

                    {

                        history.length === 0 ? (

                            <p className="empty-history">

                                No history available.

                            </p>

                        ) : (

                            history.map((item) => (

                                <div
                                    key={item._id}
                                    className="history-item"
                                    onClick={() => onOpenChat(item)}
                                >

                                    <div className="history-item-title">

                                        {

                                            item.title.length > 35

                                                ? item.title.substring(0, 35) + "..."

                                                : item.title

                                        }

                                    </div>

                                </div>

                            ))

                        )

                    }

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;