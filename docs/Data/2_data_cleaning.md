---
title: Data cleaning
description: What and where
hide_table_of_contents: false
sidebar_position: 2
autoCollapseSidebarCategories: false
---

# f(🗑) -> 🗑  so let's clean it up!

Preparing natural language data for machine learning involves several steps to ensure the data is clean, consistent, and in a format suitable for model training. We also want to create new features from the description e.g. size of the terrace or if the flat is occupied illegally ("okupas", you can read more about the fenomenon [here](https://www.idealista.com/en/news/legal-advice-in-spain/2024/04/15/816509-squatting-in-spain-understanding-spain-s-okupas-problem#:~:text=of%20such%20actions.-,The%20rise%20of%20the%20'okupa'%3A%20Economic%20crisis%20and%20housing,blend%20of%20socio%2Deconomic%20factors.))

## 1. Data Cleaning  

- **Remove Noise**: Eliminate irrelevant data, such as HTML tags, legal things the agency is required to put at the end of the listing, or advertisements.  
- **Lowercasing**: Convert all text to lowercase to maintain uniformity.  
- **Tokenization**: Split text into words or subwords, depending on the language model being used. For example, "Tokenization" becomes ["Tokenization"] or ["Token", "ization"].   
- **Remove Punctuation**: Strip punctuation marks, which are often unnecessary for many NLP tasks.
- **Remove Special Characters**: Eliminate characters that do not contribute to the understanding of the text.
- **Stop Words Removal**: Remove common words that do not carry significant meaning (e.g., "and", "the", "is").
- **Stemming/Lemmatization**: Reduce words to their base or root form. Stemming might reduce "running" to "run", while lemmatization ensures "better" becomes "good".

## 2. Data Normalization
- **Spelling Correction**: Correct misspelled words to ensure consistency.  
- **Expand Contractions**: Convert contractions (e.g., "can't" to "cannot") to their full forms.  

## 3. Feature Engineering
- **Bag of Words (BoW)**: Represent text as a collection of word counts.  
- **Term Frequency-Inverse Document Frequency (TF-IDF)**: Adjust word counts based on their frequency in the entire corpus to highlight important words.  
- **Word Embeddings**: Use pre-trained embeddings like Word2Vec, GloVe, or BERT to convert words into dense vectors that capture semantic meaning.  
- **Part-of-Speech (POS) Tagging**: Annotate words with their grammatical roles (nouns, verbs, adjectives, etc.).  
- **N-grams**: Create features based on contiguous sequences of 'n' words (e.g., bi-grams, tri-grams).  
- **Named Entity Recognition (NER)**: Identify and classify entities (e.g., people, locations, organizations) in the text.  
- **Sentiment Scores**: Add features representing the sentiment polarity of text segments.  
- **Syntactic Dependencies**: Analyze and incorporate syntactic relationships between words in sentences.  

## 4. Handling Imbalanced Data  
- Resampling: Use techniques like oversampling (e.g., SMOTE) or undersampling to balance the dataset.  
- Class Weights: Adjust the weights of classes to handle imbalanced data during training.  

## 5. Data Augmentation (Optional)  
- **Synonym Replacement**: Replace words with their synonyms to create new text examples.
- **Back Translation**: Translate text to another language and back to the original language to generate paraphrases.
- **Noise Injection**: Introduce minor errors or variations to make the model robust


Preparing natural language data for machine learning involves cleaning the data to remove noise and inconsistencies, normalizing it for uniformity, and creating features that capture the semantic and syntactic characteristics of the text. Proper data preparation ensures that the machine learning models perform well and generalize effectively. 