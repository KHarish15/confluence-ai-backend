import DocumentSelector from "./DocumentSelector";

function DocumentBar({

    selectedDocument,

    setSelectedDocument

}) {

    return (

        <div className="document-bar">

            <div className="document-label">

                 <span>Document</span>

            </div>

            <div className="document-selector">

                <DocumentSelector

                    selectedDocument={selectedDocument}

                    setSelectedDocument={setSelectedDocument}

                />

            </div>

        </div>

    );

}

export default DocumentBar;