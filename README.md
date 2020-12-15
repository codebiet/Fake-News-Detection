# Fake-News-Detection
  Here we create an easy-to-use system to detect the credibility of a user’s claim or article ,based on the concept of stance detection.
  Run the Project Here : https://fake--news--detection.herokuapp.com/

### Pipeline :
1. Users input a claim like “Obama is not a US citizen”.
2. Our program will search in the database for thousands of articles related to the
keywords.
3. We run those articles through our home-grown stance detection machine learning
model which will determine each article’s relevance to the claim and it’s stance on it.
We determine if an article agrees/disagrees/is-neutral/is-unrelated to the input
claim.
4. We then access our ever-evolving database of source reputability. If lots of reputable
sources all agree with your claim, then it’s probably true!
5. Then we cite our sources so our users can click through and read more about that
topic!

### Model Preparation :
1. Encode article headline and article bodies separately.
2. Encode our text into embedding having 512 features using Universal Embedding
Encoder.
3. Find the cosine similarity of article headline embedding and article bodies
embedding.
4. Merge article headline embedding , cosine similarity , article body embedding into
single vector.
5. Now train our model using this merged vector as input and stance as output

![alt text](https://github.com/codebiet/Fake-News-Detection/blob/master/example%20image.jpeg)

6. Model is ready for prediction having accuracy of 87.6 percent.

### Technology Used :
1. Model Preparation - Deep Learning using keras tensorflow , Natural Language
Preprocessing.
2. Frontend - HTML , CSS , Bootstrap
3. Backend - Nodejs , Google News Scrapper , News API

### Language Used :
1. Python for prepare model
2. Javascript for Backend/Frontend

### Snapshots :
![alt text](https://github.com/codebiet/Fake-News-Detection/blob/master/images/1.png)
![alt text](https://github.com/codebiet/Fake-News-Detection/blob/master/images/2.png)
![alt text](https://github.com/codebiet/Fake-News-Detection/blob/master/images/3.png)
