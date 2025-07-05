const router = express.Router();

router.post("/blogs", BlogController.createBlog);

export const BlogRoutes = router;
