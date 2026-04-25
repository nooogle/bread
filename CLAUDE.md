# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

A knowledge base and recipe collection for home bread baking, with a focus on sourdough and ancient grains.

## Baker's Percentages

All recipes in this project use **baker's percentages** as the standard unit. Everything is expressed relative to the total flour weight, which is always 100%.

```
Ingredient %  =  (ingredient weight / total flour weight) × 100
```

**Example:** 450g flour, 330g water, 9g salt, 68g starter
- Hydration: 330 / 450 × 100 = **73%**
- Salt: 9 / 450 × 100 = **2%**
- Starter (inoculation): 68 / 450 × 100 = **15%**

This makes recipes scalable — change the flour weight and multiply everything else by the same factor.

### Scaling a recipe
Pick your target flour weight, then multiply each percentage:
- Want 600g flour instead of 450g? Multiply all ingredient weights by 600/450 = 1.33×

## Repository Structure

```
CLAUDE.md                          — this file
spelt.md                           — spelt flour properties, hydration, handling
sourdough.md                       — sourdough principles: starter, fermentation, shaping, baking
recipes/
  wholemeal-spelt-sourdough.md     — 100% wholemeal spelt sourdough loaf
  white-sourdough.md               — high-hydration open-crumb white sourdough
  pain-de-campagne.md              — rustic country loaf on a rye sourdough starter
```

## Key Baking Principles

- **Temperature governs timing** — all fermentation times are guidelines; dough behaviour is the real signal
- **Hydration is flour-dependent** — always test a new bag of flour; absorption varies significantly
- **Less handling for ancient grains** — spelt, einkorn, emmer have fragile gluten; treat gently
