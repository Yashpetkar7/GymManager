// src/components/User/MealBooking.jsx
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { createMealOrder } from '../../services/api';

const mealData = {
    "mealCategories": [
      {
        "type": "veg",
        "dietOptions": {
          "weightLoss": [
            {
              "id": "veg_wl_001",
              "name": "Grilled Vegetable Salad",
              "quantity": "1 serving",
              "calories": 250,
              "description": "Mixed greens with grilled seasonal vegetables and a light vinaigrette.",
              "imageUrl": "https://images.unsplash.com/photo-1572441710427-0d7d2371bdbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              "id": "veg_wl_002",
              "name": "Cucumber Tomato Salad",
              "quantity": "1 bowl",
              "calories": 150,
              "description": "Fresh cucumbers, tomatoes, and herbs dressed with lemon.",
              "imageUrl": "https://images.unsplash.com/photo-1562967916-eb82221dfb43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ],
          "weightGain": [
            {
              "id": "veg_wg_001",
              "name": "Paneer Tikka with Quinoa",
              "quantity": "1 serving",
              "calories": 400,
              "description": "High-protein paneer tikka served with nutrient-rich quinoa.",
              "imageUrl": "https://images.unsplash.com/photo-1604908177520-8e4f5166d2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              "id": "veg_wg_002",
              "name": "Chickpea Avocado Wrap",
              "quantity": "1 wrap",
              "calories": 350,
              "description": "Wholesome wrap filled with chickpeas, avocado and fresh veggies.",
              "imageUrl": "https://images.unsplash.com/photo-1604908177520-8e4f5166d2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ]
        }
      },
      {
        "type": "non veg",
        "dietOptions": {
          "weightLoss": [
            {
              "id": "nonveg_wl_001",
              "name": "Grilled Chicken Salad",
              "quantity": "1 serving",
              "calories": 300,
              "description": "Grilled chicken breast over mixed greens with citrus dressing.",
              "imageUrl": "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              "id": "nonveg_wl_002",
              "name": "Fish & Veggie Bowl",
              "quantity": "1 bowl",
              "calories": 280,
              "description": "Steamed fish paired with a medley of fresh vegetables.",
              "imageUrl": "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ],
          "weightGain": [
            {
              "id": "nonveg_wg_001",
              "name": "Beef Steak with Vegetables",
              "quantity": "1 serving",
              "calories": 600,
              "description": "Juicy beef steak paired with a variety of steamed vegetables.",
              "imageUrl": "https://images.unsplash.com/photo-1562967916-eb82221dfb43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              "id": "nonveg_wg_002",
              "name": "Chicken Pasta Primavera",
              "quantity": "1 plate",
              "calories": 550,
              "description": "Whole wheat pasta tossed with grilled chicken and seasonal vegetables.",
              "imageUrl": "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ]
        }
      },
      {
        "type": "vegan",
        "dietOptions": {
          "weightLoss": [
            {
              "id": "vegan_wl_001",
              "name": "Quinoa & Kale Salad",
              "quantity": "1 serving",
              "calories": 280,
              "description": "Nutritious quinoa mixed with kale, cherry tomatoes and avocado slices.",
              "imageUrl": "https://images.unsplash.com/photo-1589308078059-9434a75a2b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              "id": "vegan_wl_002",
              "name": "Zucchini Noodles with Pesto",
              "quantity": "1 serving",
              "calories": 230,
              "description": "Light zucchini noodles tossed in a homemade basil pesto.",
              "imageUrl": "https://images.unsplash.com/photo-1589308078059-9434a75a2b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ],
          "weightGain": [
            {
              "id": "vegan_wg_001",
              "name": "Tofu Stir-Fry with Brown Rice",
              "quantity": "1 serving",
              "calories": 500,
              "description": "Protein-rich tofu stir-fried with mixed vegetables served over brown rice.",
              "imageUrl": "https://images.unsplash.com/photo-1617191512269-62fc93f0e95e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              "id": "vegan_wg_002",
              "name": "Vegan Lentil Curry with Quinoa",
              "quantity": "1 bowl",
              "calories": 480,
              "description": "Hearty lentil curry served over quinoa for an extra protein boost.",
              "imageUrl": "https://images.unsplash.com/photo-1617191512269-62fc93f0e95e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ]
        }
      }
    ]
  }
  

const MealBooking = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDietOption, setSelectedDietOption] = useState('');
  const [selectedMealId, setSelectedMealId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedDietOption('');
    setSelectedMealId('');
    setSelectedMeal(null);
  };

  const handleDietChange = (e) => {
    setSelectedDietOption(e.target.value);
    setSelectedMealId('');
    setSelectedMeal(null);
  };

  const handleMealChange = (e) => {
    const mealId = e.target.value;
    setSelectedMealId(mealId);
    const categoryData = mealData.mealCategories.find(cat => cat.type === selectedCategory);
    if (categoryData && categoryData.dietOptions[selectedDietOption]) {
      const meal = categoryData.dietOptions[selectedDietOption].find(m => m.id === mealId);
      setSelectedMeal(meal);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const bookingPayload = {
      userName:user.fullname,
      userId: user.userId,
      bookingDate: new Date().toISOString(),
      selectedMeals: [
        {
          mealCategory: selectedCategory,
          dietOption: selectedDietOption,
          mealId: selectedMealId,
          quantity: Number(quantity),
          notes: notes,
        }
      ]
    };

    try {
      await createMealOrder(bookingPayload);
      alert("Meal order booked successfully!");
      // Optionally, reset the form here
    } catch (error) {
      console.error("Error booking meal order:", error);
      alert("Failed to book meal order.");
    }
  };

  const dietOptions = selectedCategory
    ? Object.keys(mealData.mealCategories.find(cat => cat.type === selectedCategory).dietOptions)
    : [];

  const meals = selectedCategory && selectedDietOption 
    ? mealData.mealCategories.find(cat => cat.type === selectedCategory).dietOptions[selectedDietOption]
    : [];

  return (
    <Container maxWidth="lg" sx={{ mt: 8}}>
      <Typography variant="h4" gutterBottom align="center">
        Meal Booking
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Left Column: Selection Form */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Meal Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Meal Category"
                required
              >
                {mealData.mealCategories.map((cat) => (
                  <MenuItem key={cat.type} value={cat.type}>
                    {cat.type.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedCategory && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Diet Option</InputLabel>
                <Select
                  value={selectedDietOption}
                  onChange={handleDietChange}
                  label="Diet Option"
                  required
                >
                  {dietOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.replace(/([A-Z])/g, ' $1').trim()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {selectedDietOption && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Meal</InputLabel>
                <Select
                  value={selectedMealId}
                  onChange={handleMealChange}
                  label="Select Meal"
                  required
                >
                  {meals.map((meal) => (
                    <MenuItem key={meal.id} value={meal.id}>
                      {meal.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {selectedMeal && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  inputProps={{ min: 1 }}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  multiline
                  rows={2}
                />
              </>
            )}
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Book Meal
            </Button>
          </Grid>
          {/* Right Column: Selected Meal Info */}
          <Grid item xs={12} md={6}>
            {selectedMeal ? (
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {selectedMeal.name}
                  </Typography>
                  <Box
                    component="img"
                    src={selectedMeal.imageUrl}
                    alt={selectedMeal.name}
                    sx={{
                      width: '100%',
                      maxHeight: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mb: 2,
                    }}
                  />
                  <Typography variant="body1" gutterBottom>
                    {selectedMeal.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedMeal.quantity} | {selectedMeal.calories} Calories
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body1" align="center">
                Select a meal to see details.
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MealBooking;
