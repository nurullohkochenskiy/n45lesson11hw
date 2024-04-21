import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useTodoStore from "../store/todoStore";

const Mainpage = () => {
  const [inpVal, setInpVal] = useState("");
  const { fetchTodos, todos, createTodo, deleteTodo, toggleTodo } =
    useTodoStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: inpVal,
      isCompleted: false,
    };
    if (inpVal.length) {
      createTodo(todo);
      setInpVal("");
    }
  };

  const handleToggleComplete = (id) => {
    toggleTodo(id);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div className="table-wrapper">
      <div className="leftside">
        {totalCount ? (
          <React.Fragment>
            <p className="completedcount">
              {completedCount}/{totalCount}
            </p>
            {completedCount === totalCount ? (
              <p className="inspiring">
                You have completed all of your tasks! Good job
              </p>
            ) : (
              <p className="leftside_title">
                You have completed {completedCount}/{totalCount} of your tasks
              </p>
            )}
          </React.Fragment>
        ) : (
          <p className="leftside_title">You don't have any tasks yet</p>
        )}
      </div>
      <div className="rightside">
        <h1 className="title">Add your todo</h1>
        <div className="addTodobar">
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            display={"flex"}
            justifyContent={"space-between"}
          >
            <TextField
              value={inpVal}
              onChange={(e) => setInpVal(e.target.value)}
              sx={{
                background: "white",
                width: "85%",
                borderRadius: "15px",
                color: "#7C7A88",
              }}
              placeholder="Enter todo"
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ width: "13%", borderRadius: "15px" }}
            >
              Add
            </Button>
          </Box>
        </div>
        <div className="todolistcontainer">
          <ul className="todolist">
            {todos.map((todo, index) => (
              <li className="todolistItem" key={todo.id}>
                <div className="todolistItem_block">
                  <div className="left">
                    <p className="todoorder">{index + 1}</p>
                    {todo.isCompleted ? (
                      <strike className="todoname">{todo.title}</strike>
                    ) : (
                      <p className="todoname">{todo.title}</p>
                    )}
                  </div>
                  <div className="right">
                    <div
                      className="toggleComplete"
                      onClick={() => handleToggleComplete(todo.id)}
                    >
                      {todo.isCompleted ? (
                        <CheckCircleOutlineIcon
                          fontSize="large"
                          sx={{ fill: "#987dfe" }}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          fontSize="large"
                          sx={{ fill: "#987dfe" }}
                        />
                      )}
                    </div>
                    <div
                      className="delete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <DeleteIcon fontSize="large" sx={{ fill: "#987dfe" }} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
