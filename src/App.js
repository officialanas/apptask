import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { Modal, ModalContent } from "./Model";

const finalSpaceCharacters = [
  {
    id: "bank-draft",
    name: "Bank Draft",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcSL01jka9aa1Kfn0UylLalvD3_v2mUvK1IDmhUx_wHstRT_oYLKMHZ61oVi2H8uptUsI&usqp=CAU",
  },
  {
    id: "bill-of-lading",
    name: "Bill of Lading",
    thumb:
      "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "invoice",
    name: "Invoice",
    thumb:
      "https://images.pexels.com/photos/982300/pexels-photo-982300.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "bank-draft-2",
    name: "Bank Draft 2",
    thumb:
      "https://images.pexels.com/photos/6897077/pexels-photo-6897077.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "bill-of-lading-2",
    name: "Bill of Lading-2",
    thumb:
      "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [isOpen, setIsopen] = useState(false);
  const showModal = () => setIsopen((prev) => !prev);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag and Drop</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="characters-thumb">
                            {/* <img src={thumb} alt={`${name} Thumb`} /> */}

                            <Modal onOpen={showModal}>
                              <div className="holder">
                                <img
                                  src={thumb}
                                  alt={`${name} Thumb`}
                                  index={index}
                                />
                              </div>
                            </Modal>
                            {isOpen && (
                              <ModalContent onClose={() => setIsopen(false)}>
                                <img
                                  src={thumb}
                                  alt={`${name} Thumb`}
                                  index={index}
                                />
                              </ModalContent>
                            )}
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
