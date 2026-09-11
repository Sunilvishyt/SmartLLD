"""
Hardcoded LLD problems. No database required for problems.
problem_id is a string key (slug) used to reference problems throughout the app.
"""

from typing import Dict

PROBLEMS: Dict[str, dict] = {
    "parking-lot": {
        "id": "parking-lot",
        "title": "Parking Lot",
        "difficulty": "Medium",
        "description": (
            "Design a Parking Lot system that can handle multiple floors, "
            "different vehicle types, and payment processing. The system should "
            "be able to track available spots, assign spots to vehicles on entry, "
            "and calculate parking fees on exit."
        ),
        "requirements": (
            "- Support multiple parking floors\n"
            "- Handle different vehicle types: Car, Bike, Truck\n"
            "- Each vehicle type requires a specific spot size\n"
            "- Track available and occupied spots in real time\n"
            "- Assign the nearest available spot to incoming vehicles\n"
            "- Support payment processing on exit (flat rate per hour)\n"
            "- Generate a parking ticket on entry with timestamp and spot info\n"
            "- Allow the lot to be queried for availability"
        ),
        "starter_code": {
            "python": (
                "# Design a Parking Lot system\n"
                "# Feel free to add/remove classes as needed\n\n"
                "class Vehicle:\n"
                "    pass\n\n"
                "class ParkingSpot:\n"
                "    pass\n\n"
                "class ParkingFloor:\n"
                "    pass\n\n"
                "class ParkingLot:\n"
                "    pass\n\n"
                "class ParkingTicket:\n"
                "    pass\n\n"
                "class PaymentProcessor:\n"
                "    pass\n"
            ),
            "java": (
                "// Design a Parking Lot system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Vehicle {}\n\n"
                "class ParkingSpot {}\n\n"
                "class ParkingFloor {}\n\n"
                "class ParkingLot {}\n\n"
                "class ParkingTicket {}\n\n"
                "class PaymentProcessor {}\n"
            ),
            "javascript": (
                "// Design a Parking Lot system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Vehicle {}\n\n"
                "class ParkingSpot {}\n\n"
                "class ParkingFloor {}\n\n"
                "class ParkingLot {}\n\n"
                "class ParkingTicket {}\n\n"
                "class PaymentProcessor {}\n"
            ),
            "cpp": (
                "// Design a Parking Lot system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Vehicle {};\n\n"
                "class ParkingSpot {};\n\n"
                "class ParkingFloor {};\n\n"
                "class ParkingLot {};\n\n"
                "class ParkingTicket {};\n\n"
                "class PaymentProcessor {};\n"
            )
        }
    },
    "vending-machine": {
        "id": "vending-machine",
        "title": "Vending Machine",
        "difficulty": "Easy",
        "description": (
            "Design a Vending Machine that can dispense products, accept coins/cash, "
            "provide change, and manage inventory. The machine should handle different "
            "states (idle, waiting for money, dispensing) and support multiple product slots."
        ),
        "requirements": (
            "- Support multiple product slots, each with a product type and quantity\n"
            "- Accept different coin/note denominations\n"
            "- Display available products and their prices\n"
            "- Allow product selection only if sufficient funds are inserted\n"
            "- Dispense the selected product and return correct change\n"
            "- Handle out-of-stock and insufficient funds scenarios gracefully\n"
            "- Allow the machine to be refilled and money collected by an admin\n"
            "- Model machine states clearly (Idle, HasMoney, Dispensing, etc.)"
        ),
        "starter_code": {
            "python": (
                "# Design a Vending Machine system\n"
                "# Feel free to add/remove classes as needed\n\n"
                "class Product:\n"
                "    pass\n\n"
                "class Slot:\n"
                "    pass\n\n"
                "class Inventory:\n"
                "    pass\n\n"
                "class VendingMachine:\n"
                "    pass\n\n"
                "class State:\n"
                "    pass\n"
            ),
            "java": (
                "// Design a Vending Machine system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Product {}\n\n"
                "class Slot {}\n\n"
                "class Inventory {}\n\n"
                "class VendingMachine {}\n\n"
                "interface State {}\n"
            ),
            "javascript": (
                "// Design a Vending Machine system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Product {}\n\n"
                "class Slot {}\n\n"
                "class Inventory {}\n\n"
                "class VendingMachine {}\n"
            ),
            "cpp": (
                "// Design a Vending Machine system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Product {};\n\n"
                "class Slot {};\n\n"
                "class Inventory {};\n\n"
                "class VendingMachine {};\n"
            )
        }
    },
    "movie-ticket": {
        "id": "movie-ticket",
        "title": "Movie Ticket Booking",
        "difficulty": "Hard",
        "description": (
            "Design a Movie Ticket Booking system similar to BookMyShow. "
            "The system should allow users to browse movies, select shows, "
            "choose seats on an interactive layout, and make bookings. "
            "Handle seat locking during the booking process to avoid double-booking."
        ),
        "requirements": (
            "- Support multiple movies, theatres, and screens\n"
            "- Each screen has a seat layout with rows and categories (e.g., Gold, Silver, Premium)\n"
            "- Users can browse movies and available showtimes\n"
            "- Users can select specific seats from a seat map\n"
            "- Seats should be temporarily locked while a user is in the booking flow\n"
            "- Process payment and confirm booking\n"
            "- Generate booking confirmation with seat info\n"
            "- Handle cancellation and refunds\n"
            "- Prevent double-booking of the same seat for the same show"
        ),
        "starter_code": {
            "python": (
                "# Design a Movie Ticket Booking system\n"
                "# Feel free to add/remove classes as needed\n\n"
                "class Movie:\n"
                "    pass\n\n"
                "class Theatre:\n"
                "    pass\n\n"
                "class Screen:\n"
                "    pass\n\n"
                "class Seat:\n"
                "    pass\n\n"
                "class Show:\n"
                "    pass\n\n"
                "class Booking:\n"
                "    pass\n\n"
                "class PaymentProcessor:\n"
                "    pass\n"
            ),
            "java": (
                "// Design a Movie Ticket Booking system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Movie {}\n\n"
                "class Theatre {}\n\n"
                "class Screen {}\n\n"
                "class Seat {}\n\n"
                "class Show {}\n\n"
                "class Booking {}\n\n"
                "class PaymentProcessor {}\n"
            ),
            "javascript": (
                "// Design a Movie Ticket Booking system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Movie {}\n\n"
                "class Theatre {}\n\n"
                "class Screen {}\n\n"
                "class Seat {}\n\n"
                "class Show {}\n\n"
                "class Booking {}\n\n"
                "class PaymentProcessor {}\n"
            ),
            "cpp": (
                "// Design a Movie Ticket Booking system\n"
                "// Feel free to add/remove classes as needed\n\n"
                "class Movie {};\n\n"
                "class Theatre {};\n\n"
                "class Screen {};\n\n"
                "class Seat {};\n\n"
                "class Show {};\n\n"
                "class Booking {};\n\n"
                "class PaymentProcessor {};\n"
            )
        }
    }
}

def get_all_problems() -> list:
    """Return a list of all problems (without starter_code for listing)."""
    return [
        {"id": p["id"], "title": p["title"], "difficulty": p["difficulty"]}
        for p in PROBLEMS.values()
    ]

def get_problem_by_id(problem_id: str) -> dict | None:
    """Return the full problem detail by its slug ID."""
    return PROBLEMS.get(problem_id)
