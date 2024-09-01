
// class Review(models.Model):
//     product = models.ForeignKey(Product, on_delete=models.CASCADE)
//     # review = models.TextChoices('Up': 'Up vote', 'Down': 'Down Vote')
//     description = models.TextField()
//     created = models.DateTimeField(auto_now_add=True)
//     # id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
//     # reveiwer = models.ForeignKey(User, on_delete=models.CASCADE)

const mongoose = require("mongoose");
export const reviewSchema = new mongoose.Schema({
    product : String,
    description : String,
    // image : String,
    created : {type: Date, default:Date.now()},
    reviewer : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
})