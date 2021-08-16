import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
const [categories, setCategories] = useState([]);

const getAllCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        },
    })
    .then((res) => res.json())
      .then((data) => setCategories(data)); // updates state with tags from server
};

const getCategoryById = (category_id) => {
    return fetch(`http://localhost:8000/categories/${category_id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        },
    })
    .then((res) => res.json());
};

const createCategory = (newCategoryObj) => {
    return fetch (`http://localhost:8000/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        }, 
        body: JSON.stringify(newCategoryObj)
    })
}

    return (
        <CategoryContext.Provider
        value={{
            categories,
            getAllCategories,
            getCategoryById,
            createCategory,
        }}
        >
        {props.children}
        </CategoryContext.Provider>
    );
};
