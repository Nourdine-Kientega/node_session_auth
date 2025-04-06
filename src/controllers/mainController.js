import { getAllCourses } from "./coursesController.js";

const showHomepage = async (req, res) => {

    const { courses } = await getAllCourses();

    res.render('homepage', { title: 'Homepage', courses });
};

const showAboutPage = (req, res) => {

};

export { showHomepage, showAboutPage };