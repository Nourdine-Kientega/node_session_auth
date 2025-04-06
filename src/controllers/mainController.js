import { getAllCourses } from "./coursesController.js";

const showHomepage = async (req, res) => {

    const { courses } = await getAllCourses();

    // const username = req.session.user ? req.session.user.username : '';
    // console.log(req.session);
    
    res.render('homepage', { title: 'Homepage', courses });
};

const showAboutPage = (req, res) => {

};

const showAdminPage = (req, res) => {

    res.render('admin');
};

export { showHomepage, showAboutPage, showAdminPage };