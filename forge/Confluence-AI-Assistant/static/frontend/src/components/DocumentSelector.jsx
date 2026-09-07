import { useEffect, useState } from "react";
import { getPages } from "../services/api";

const SPACE_ID = "1966084";

function DocumentSelector({ selectedDocument, setSelectedDocument }) {

    const [pages, setPages] = useState([]);

    useEffect(() => {

        const fetchPages = async () => {

            try {

                const response = await getPages(SPACE_ID);

                const pageList = response.data.pages.results;

                setPages(pageList);

                if (pageList.length > 0 && !selectedDocument) {

                    setSelectedDocument(pageList[0].id);

                }

            }

            catch (error) {

                console.error("Failed to load pages:", error);

            }

        };

        fetchPages();

    }, []);

    return (

        <div>

            <br /><br />

            <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
            >

                {

                    pages.map((page) => (

                        <option
                            key={page.id}
                            value={page.id}
                        >
                            {page.title}
                        </option>

                    ))

                }

            </select>

        </div>

    );

}

export default DocumentSelector;