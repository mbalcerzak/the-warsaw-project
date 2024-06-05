---
title: Feature Engineering
description: What and where
hide_table_of_contents: false
sidebar_position: 4
autoCollapseSidebarCategories: false
---


# Techniques

Numerical range:  
- scaling  
- normalising
- standardizing  

Grouping:  
- bucketizing  
- bag of words  


Dimenisonality reduciton
Feature crossing

Shapley values??


### Feature Engineering
Regardless of the model, feature engineering plays a critical role in the performance of your prediction. Here are some features you might consider:
- **Historical Prices**: Lagged values of past prices.
- **Rolling Statistics**: Rolling means, standard deviations, and other statistics over different time windows.
- **External Factors**: Economic indicators, interest rates, and other macroeconomic variables.
- **Property Features**: Size, number of rooms, location-specific features.
- **Temporal Features**: Time of year, day of the week, seasonality factors.



Some new features  I created that inform about the legal state of the 
- okupas - is the property illegally occupied - read more about the problem in Spain [here](https://www.idealista.com/en/news/legal-advice-in-spain/2024/04/15/816509-squatting-in-spain-understanding-spain-s-okupas-problem)
- alquilado - does it currently have a tenant living inside and the buyer will have to respect the contract until it ends on the date as outlined in the original contract - read more [here](https://www.thelocal.es/20230817/buying-a-property-in-spain-with-a-tenant-living-in-it-how-does-it-work)
- propiedad_nuda - when we buy the property but current owners have the right to live there for the rest of their lives. We sometimes need to pay them monthly allowance as well - read more [here](https://www.eliasymunozabogados.com/en/blog/nuda-propiedad-what-it-and-how-it-differs-usufruct-and-full-ownership)