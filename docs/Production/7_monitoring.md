---
title: Monitoring and logging
description: ML maintenance
hide_table_of_contents: false
sidebar_position: 7
autoCollapseSidebarCategories: false
---


## Ground Truth Evaluation

Most important step is to train ground truth model. In case of this project the label is apartment price. Fortunately in this case the "true" price specified by the owner/agency is available so it's feasible to check the model accuracy real time. 

[] has the model degraded quickly?

Even though price of some apartments changes, overall they make only around 1% of all advertisements published this year. 

New data gets collected and once the performance of the model (evalated on the newly gathered data) drops below a certain threshold, the model needs to be retrained. 

Metrics that would show whether the model is outdated:
- ROC AUC
- log loss
And we should also look at those metrict in subpopulations. 

##  Input Drift Detection

[] Feature drift vs. concept drift 

Data distribution should not diverge too much between the training and testing phases. 

Usually data drift occurs due to the training data collected not representing the target population. 